import { Model, Types } from 'mongoose';

export type IOrder = {
  buyer: Types.ObjectId;
  cow: Types.ObjectId;
  seller: Types.ObjectId;
};

export type orderModel = Model<IOrder, Record<string, unknown>>;
