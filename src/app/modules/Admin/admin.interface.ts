import { Model } from 'mongoose';

export type adminName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  phoneNumber: string;
  role: 'admin';
  password: string;
  name: adminName;
  address: string;
};
export type AdminModel = Model<IAdmin, Record<string, unknown>>;
