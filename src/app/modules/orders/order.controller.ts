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
  const result = await OrderService.getAllOrders();
  sendResponse<IOrder[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

export const OrderController = { createOrder, getAllOrders };
