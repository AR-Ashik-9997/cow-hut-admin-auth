/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin, ILoginMethod } from './admin.interface';
import { role } from './admin.constant';
import ApiError from '../../../eroors/apiErrorHandler';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from '../../../config';

const adminSchema = new Schema<IAdmin, Record<string, never>, ILoginMethod>(
  {
    password: { type: String, required: true, select: false },
    role: { type: String, enum: role },
    name: {
      required: true,
      type: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
    },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
adminSchema.pre('save', async function (next) {
  const admin = this;
  const isExist = await Admin.findOne({
    phoneNumber: this.phoneNumber,
  });
  admin.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'phoneNumber is already exists !');
  }
  next();
});

adminSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password; // Exclude the password field from the response
    return ret;
  },
});

adminSchema.methods.isExistPhoneNumber = async function (
  phoneNumber: string
): Promise<Partial<IAdmin> | null> {
  return await Admin.findOne({ phoneNumber }, { role: 1, password: 1 }).lean();
};
export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
