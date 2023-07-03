import { startSession } from 'mongoose';
import { IOrder } from './order.interface';
import { Cow } from '../cows/cow.model';
import { User } from '../users/user.model';
import { Order } from './order.model';
import httpStatus from 'http-status';
import ApiError from '../../../eroors/apiErrorHandler';

const createOrder = async (orderData: IOrder): Promise<IOrder> => {
  const { cow, buyer } = orderData;

  let newOrder = null;
  const session = await startSession();

  try {
    session.startTransaction();

    const cowDocument = await Cow.findById(cow);
    const buyerDocument = await User.findById(buyer);

    if (!cowDocument || !buyerDocument) {
      throw new Error('Invalid cow or buyer.');
    }
    if (cowDocument.label === 'sold out') {
      throw new Error('Cow is sold out');
    }
    if (buyerDocument.budget < cowDocument.price) {
      throw new Error(
        'Insufficient funds. Please add more money to your account.'
      );
    }
    cowDocument.label = 'sold out';
    await cowDocument.save();
    buyerDocument.budget -= cowDocument.price;
    await User.findByIdAndUpdate(
      { _id: buyer },
      { budget: buyerDocument.budget },
      { new: true }
    );

    const sellerDocument = await User.findById(cowDocument.seller).session(
      session
    );
    if (!sellerDocument) {
      throw new Error('Invalid seller.');
    }
    sellerDocument.income += cowDocument.price;
    await User.findByIdAndUpdate(
      { _id: cowDocument.seller },
      { income: sellerDocument.income },
      { new: true }
    );

    const order = new Order({
      cow: cowDocument._id,
      buyer: buyerDocument._id,
      seller: sellerDocument._id,
    });
    await order.save();
    if (!Object.keys(order).length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order');
    }
    newOrder = order;
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return newOrder;
};

const getAllOrders = async (
  userId: string,
  role: string
): Promise<IOrder[] | IOrder | null> => {
  let result = null;

  if (role === 'admin') {
    result = await Order.find({})
      .populate('buyer')
      .populate('seller')
      .populate('cow');
  }
  if (role === 'buyer') {
    const isOrrderExist = await Order.findOne({ buyer: userId });
    if (!isOrrderExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Your data is not found!');
    }
    result = await Order.find({ buyer: userId })
      .populate('buyer')
      .populate('seller')
      .populate('cow');
  }
  if (role === 'seller') {
    const isOrrderExist = await Order.findOne({ seller: userId });
    if (!isOrrderExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Your data is not found!');
    }
    result = await Order.findOne({ seller: userId })
      .populate('buyer')
      .populate('seller')
      .populate('cow');
  }
  return result;
};

const getOrderById = async (
  orderId: string,
  userId: string,
  role: string
): Promise<IOrder[] | IOrder | null> => {
  let result = null;
  const isExistOrder = await Order.findById(orderId);
  if (!isExistOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  if (isExistOrder && role === 'admin') {
    result = await Order.find().populate('buyer').populate('cow');
  } else if (isExistOrder && role === 'buyer') {
    if (isExistOrder && !isExistOrder.buyer.equals(userId)) {
      throw new ApiError(httpStatus.FORBIDDEN, 'your order not found');
    }
    result = await Order.findOne({ _id: orderId })
      .populate('buyer')
      .populate('cow')
      .populate('seller');
  } else if (isExistOrder && role === 'seller') {
    if (isExistOrder && !isExistOrder.seller.equals(userId)) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not authorized to perform this action'
      );
    } else {
      result = await Order.findOne({ _id: orderId })
        .populate('buyer')
        .populate('seller')
        .populate('cow');
    }
  }
  return result;
};

export const OrderService = { createOrder, getAllOrders, getOrderById };
