import express from 'express';
import { UserController } from './user.controller';
import requestValidation from '../../../middleware/requestValidation';
import { UserValidation } from './user.validation';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../enum/user';
const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.getMyProfile
);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch(
  '/my-profile',
  requestValidation(UserValidation.updateUserProfilezodValidationSchema),
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.updateMyProfile
);
router.patch(
  '/:id',
  requestValidation(UserValidation.updateUserzodValidationSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateSingleUser
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteSingleUser
);

export const UserRoutes = router;
