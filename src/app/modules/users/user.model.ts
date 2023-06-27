import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { role } from './user.constant';
import ApiError from '../../../eroors/apiErrorHandler';
import httpStatus from 'http-status';

const userSchema = new Schema<IUser, UserModel>(
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
// userSchema.pre('save', async function (next) {
//   const isExist = await User.findOne({
//     phoneNumber: this.phoneNumber    
//   });
//   if (isExist) {
//     throw new ApiError(
//       httpStatus.CONFLICT,
//       'phoneNumber is already exists !'
//     );
//   }
//   next();
// });
export const User = model<IUser, UserModel>('User', userSchema);
