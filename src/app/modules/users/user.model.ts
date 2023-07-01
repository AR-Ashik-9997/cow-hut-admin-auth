/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, IUserLoginMethod, UserModel } from './user.interface';
import { role } from './user.constant';
import ApiError from '../../../eroors/apiErrorHandler';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, Record<string, never>, IUserLoginMethod>(
  {
    password: { type: String, required: true },
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
    budget: { type: Number, required: true, default: 0 },
    income: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.pre('save', async function (next) {
  const user = this;
  const isExist = await User.findOne({
    phoneNumber: user.phoneNumber,
  });
  user.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'phoneNumber is already exists !');
  }
  next();
});
userSchema.methods.isExistPhoneNumber = async function (
  phoneNumber: string
): Promise<Partial<IUser> | null> {
  return await User.findOne({ phoneNumber }, { role: 1, password: 1 }).lean();
};
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password; // Exclude the password field from the response
    return ret;
  },
});
export const User = model<IUser, UserModel>('User', userSchema);
