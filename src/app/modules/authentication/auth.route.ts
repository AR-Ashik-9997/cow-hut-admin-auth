import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { UserValidation } from '../users/user.validation';
import { authController } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  requestValidation(UserValidation.createUserzodValidationSchema),
  authController.createUser
);

export const AuthRoute = router;
