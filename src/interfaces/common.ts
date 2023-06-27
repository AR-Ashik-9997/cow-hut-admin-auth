import { IGenerickErrorMessage } from './error';
export type IGenerickErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenerickErrorMessage[];
};

export type IGenerickResponse<T> = {
  meta: {
    page: number;
    limit: number;
    count: number;
  };
  data: T;
};
