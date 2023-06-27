import { Model, Types } from 'mongoose';
import { IUser } from '../users/user.interface';

export type Ilocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export type Ilabel = 'for sale' | 'sold out';

export type Icategory = 'Dairy' | 'Beef' | 'DualPurpose';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: Ilocation;
  breed: string;
  weight: number;
  label: Ilabel;
  category: Icategory;
  seller: Types.ObjectId | IUser;
};
export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilter = {
  searchTerm?: string;
  id?: string;
  name?: string;
  location?: string;
  label?: string;
  breed?: string;
  category?: string;
};
