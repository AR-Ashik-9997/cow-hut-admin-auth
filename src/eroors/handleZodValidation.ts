import { ZodError, ZodIssue } from 'zod';
import { IGenerickErrorMessage } from '../interfaces/error';
import { IGenerickErrorResponse } from './../interfaces/common';

const handleZodError = (error: ZodError): IGenerickErrorResponse => {
  const errors: IGenerickErrorMessage[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorMessages: errors,
  };
};
export default handleZodError;
