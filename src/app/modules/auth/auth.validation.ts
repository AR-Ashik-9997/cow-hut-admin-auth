import { z } from 'zod';

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});
const UserLoginzodValidationSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'password is required' }),
    phoneNumber: z.string({ required_error: 'phone number is required' }),
  }),
});

export const AuthValidation = {
  refreshTokenZodSchema,
  UserLoginzodValidationSchema,
};
