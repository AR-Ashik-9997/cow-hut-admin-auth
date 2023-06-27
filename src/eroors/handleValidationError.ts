import mongoose from 'mongoose';
import { IGenerickErrorMessage } from '../interfaces/error';
import { IGenerickErrorResponse } from '../interfaces/common';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenerickErrorResponse => {
  const errors: IGenerickErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
export default handleValidationError;
