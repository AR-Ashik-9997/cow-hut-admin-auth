import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponseApi';
import { ICow } from './cow.interface';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { CowService } from './cow.service';
import pick from '../../../shared/pickPagination';
import { paginationField } from '../../../shared/constants';
import { CowFilterableFields } from './cow.constant';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;
  const result = await CowService.createCow(cowData);
  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow created successfully',
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CowFilterableFields);
  const paginationOptions = pick(req.query, paginationField);
  const result = await CowService.getAllCows(filters, paginationOptions);
  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.getSingleCow(id);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved successfully',
    data: result,
  });
});
const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await CowService.updateCow(id, updatedData);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully',
    data: result,
  });
});
const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.deleteCow(id);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully',
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
