import { z } from 'zod';

const createOrderzodValidationSchema = z.object({
  body: z.object({
    cow: z.string({ required_error: 'Cow reference id is required' }),
    buyer: z.string({ required_error: 'buyer reference id is required' }),
  }),
});

export const OrderValidation = {
  createOrderzodValidationSchema,
};
