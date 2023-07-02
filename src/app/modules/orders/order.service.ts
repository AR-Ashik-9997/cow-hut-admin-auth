import mongoose, { startSession } from 'mongoose';
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
    if (buyerDocument.budget < cowDocument.price) {
      throw new Error(
        'Insufficient funds. Please add more money to your account.'
      );
    }
    cowDocument.label = 'sold out';
    await cowDocument.save();
    buyerDocument.budget -= cowDocument.price;
    await buyerDocument.save();

    const sellerDocument = await User.findById(cowDocument.seller).session(
      session
    );
    if (!sellerDocument) {
      throw new Error('Invalid seller.');
    }
    sellerDocument.income += cowDocument.price;
    await sellerDocument.save();

    const order = new Order({
      cow: cowDocument._id,
      buyer: buyerDocument._id,
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

const getAllOrders = async (): Promise<IOrder[] | null> => {
  const result = await Order.find().populate('buyer').populate('cow');
  return result;
};

const getOrderById = async (
  orderId: string,
  userId: string,
  role: string
): Promise<IOrder[] | null> => {
  let result: IOrder[] | null = null;
  const isExistOrder = await Order.findById(orderId);
  if (!isExistOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  if (isExistOrder && role === 'admin') {
    result = await Order.find().populate('buyer').populate('cow');
  } else if (isExistOrder && role === 'buyer') {
    if (isExistOrder.buyer !== new mongoose.Types.ObjectId(userId)) {
      throw new ApiError(httpStatus.FORBIDDEN, 'your order not found');
    }
    result = await Order.findOne({ _id: orderId, buyer: userId })
      .populate('buyer')
      .populate('cow');
  } else if (isExistOrder && role === 'seller') {
    const cow = await Cow.findOne({ _id: isExistOrder?.cow?._id });
    if (!cow) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found');
    }
    if (cow?.seller !== new mongoose.Types.ObjectId(userId)) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not authorized to perform this action'
      );
    } else {
      result = await Order.findOne({ _id: orderId })
        .populate('buyer')
        .populate('cow');
    }
  }
  return result;
};

export const OrderService = { createOrder, getAllOrders, getOrderById };
