import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { UserValidation } from '../users/user.validation';
import { authController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  requestValidation(UserValidation.createUserzodValidationSchema),
  authController.createUser
);
router.post(
  '/login',
  requestValidation(AuthValidation.UserLoginzodValidationSchema),
  authController.LoginUser
);
router.post(
  '/refresh-token',
  requestValidation(AuthValidation.refreshTokenZodSchema),
  authController.refreshToken
);

export const AuthRoute = router;
