/* eslint-disable no-unused-vars */
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

export type ILoginMethod = {
  isExistPhoneNumber(phoneNumber: string): Promise<Partial<IAdmin> | null>;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>, ILoginMethod>;
