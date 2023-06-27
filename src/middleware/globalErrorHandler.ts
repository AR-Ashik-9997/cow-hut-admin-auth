/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ZodError } from 'zod';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import handleValidationError from '../eroors/handleValidationError';
import { IGenerickErrorMessage } from '../interfaces/error';
import ApiError from '../eroors/apiErrorHandler';
import config from '../config';
import handleZodError from '../eroors/handleZodValidation';
import handleCastError from '../eroors/handleCastError';
import httpStatus from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log('global error handler', error)
    : console.log('global error handler', error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenerickErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    const value = Object.values(error.keyValue)[0];
    const errors: IGenerickErrorMessage[] = [
      {
        path: field,
        message: `duplicate key error. The value '${field}:${value}' already exists`,
      },
    ];
    statusCode = httpStatus.BAD_REQUEST;
    message = 'Duplicate key error';
    errorMessages = errors;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next(error);
};

export default globalErrorHandler;
