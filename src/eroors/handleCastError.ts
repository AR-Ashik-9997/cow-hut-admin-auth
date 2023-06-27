import mongoose from 'mongoose';
import { IGenerickErrorMessage } from '../interfaces/error';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenerickErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Cast Error',
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleCastError;
