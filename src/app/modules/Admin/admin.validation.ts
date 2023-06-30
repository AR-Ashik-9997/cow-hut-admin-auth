import { z } from 'zod';
import { role } from './admin.constant';

const createAdminzodValidationSchema = z.object({
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
  }),
});
const adminLoginzodValidationSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'password is required' }),
    phoneNumber: z.string({ required_error: 'phone number is required' }),
  }),
});
export const AdminValidation = {
  createAdminzodValidationSchema,
  adminLoginzodValidationSchema,
};
