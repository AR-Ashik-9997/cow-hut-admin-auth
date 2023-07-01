import { z } from 'zod';
import { role } from './user.constant';

const createUserzodValidationSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'password is required' }),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'role is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    phoneNumber: z.string({ required_error: 'phone number is required' }),
    address: z.string({ required_error: 'address is required' }),
    budget: z.number({ required_error: 'budget is required' }),
    income: z.number({ required_error: 'income is required' }),
  }),
});

const updateUserzodValidationSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'password is required' }).optional(),
    role: z
      .enum([...role] as [string, ...string[]], {
        required_error: 'role is required',
      })
      .optional(),
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .optional(),
      })
      .optional(),
    phoneNumber: z
      .string({ required_error: 'phone number is required' })
      .optional(),
    address: z.string({ required_error: 'address is required' }).optional(),
    budget: z.number({ required_error: 'budget is required' }).optional(),
    income: z.number({ required_error: 'income is required' }).optional(),
  }),
});
const updateUserProfilezodValidationSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'password is required' }).optional(),
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .optional(),
      })
      .optional(),
    phoneNumber: z
      .string({ required_error: 'phone number is required' })
      .optional(),
    address: z.string({ required_error: 'address is required' }).optional(),
  }),
});

export const UserValidation = {
  createUserzodValidationSchema,
  updateUserzodValidationSchema,
  updateUserProfilezodValidationSchema,
};
