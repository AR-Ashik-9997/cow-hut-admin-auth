import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';
import { role } from './admin.constant';

const adminSchema = new Schema<IAdmin, AdminModel>(
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

adminSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password; // Exclude the password field from the response
    return ret;
  },
});
export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
