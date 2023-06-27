import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../../shared/sendResponseApi';
import httpStatus from 'http-status';
import { IUser } from '../users/user.interface';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await authService.createUser(userData);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  });
});
export const authController = { createUser };
