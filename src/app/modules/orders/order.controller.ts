import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { OrderService } from './order.service';
import sendResponse from '../../../shared/sendResponseApi';
import { IOrder } from './order.interface';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...orderData } = req.body;
  const result = await OrderService.createOrder(orderData);
  sendResponse<IOrder>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const userRole = req?.user?.role;
  const result = await OrderService.getAllOrders(userId, userRole);
  sendResponse<IOrder[] | IOrder>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
    data: result,
  });
});
const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req?.user?._id;
  const userRole = req?.user?.role;
  const result = await OrderService.getOrderById(id, userId, userRole);
  sendResponse<IOrder[] | IOrder>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order information retrieved successfully',
    data: result,
  });
});

export const OrderController = { createOrder, getAllOrders, getOrderById };
