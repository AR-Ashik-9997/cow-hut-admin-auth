import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponseApi';
import { IAdmin, IAdminLoginResponse } from './admin.interface';
import httpStatus from 'http-status';
import { AdminService } from './admin.service';
import config from '../../../config';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;
  const result = await AdminService.createAdmin(adminData);
  sendResponse<IAdmin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin created successfully',
    data: result,
  });
});

const LoginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AdminService.LoginAdmin(loginData);
  const { refreshToken, ...other } = result;
  const cookie = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookie);
  sendResponse<IAdminLoginResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: other,
  });
});

export const AdminController = { createAdmin, LoginAdmin };
