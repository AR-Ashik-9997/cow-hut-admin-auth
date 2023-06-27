import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';
import { cowCategory, cowLabel, cowLocation } from './cow.constant';

const cowSchema = new Schema<ICow, CowModel>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: cowLocation },
    breed: { type: String, required: true },
    weight: { type: Number, required: true },
    label: { type: String, enum: cowLabel, default: 'for sale' },
    category: { type: String, enum: cowCategory },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
