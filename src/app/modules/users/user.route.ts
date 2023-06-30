import express from 'express';
import { UserController } from './user.controller';
import requestValidation from '../../../middleware/requestValidation';
import { UserValidation } from './user.validation';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../enum/user';
const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  requestValidation(UserValidation.updateUserzodValidationSchema),
  UserController.updateSingleUser
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteSingleUser
);
export const UserRoutes = router;
