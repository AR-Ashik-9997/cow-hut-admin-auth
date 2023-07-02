import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponseApi';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  sendResponse<IUser[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await UserService.updateSingleUser(id, updatedData);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteSingleUser(id);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req?.user?._id;
  const result = await UserService.getMyProfile(id as string);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User's information retrieved successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req?.user?._id;
  const updatedData = req.body;
  const result = await UserService.updateMyProfile(id as string, updatedData);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User's information retrieved successfully",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  getMyProfile,
  updateMyProfile,
};
