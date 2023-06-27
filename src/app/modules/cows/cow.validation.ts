import { z } from 'zod';
import { cowCategory, cowLabel, cowLocation } from './cow.constant';

const createCowzodValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'cow name is required' }),
    age: z.number({ required_error: 'cow age is required' }),
    price: z.number({ required_error: 'Cow price is required' }),
    location: z.enum([...cowLocation] as [string, ...string[]], {
      required_error: 'cow location is required',
    }),
    breed: z.string({
      required_error: 'cowbreed is required',
    }),
    weight: z.number({ required_error: 'cow weight is required' }),
    label: z
      .enum([...cowLabel] as [string, ...string[]], {
        required_error: 'cow label is required',
      })
      .default('for sale'),

    category: z.enum([...cowCategory] as [string, ...string[]], {
      required_error: 'cow category is required',
    }),
  }),
});
const updateCowzodValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...cowLocation] as [string, ...string[]]).optional(),
    breed: z.string().optional(),
    weight: z.number().optional(),
    label: z.enum([...cowLabel] as [string, ...string[]]).optional(),

    category: z.enum([...cowCategory] as [string, ...string[]]).optional(),
  }),
});

export const CowValidation = {
  createCowzodValidationSchema,
  updateCowzodValidationSchema,
};
