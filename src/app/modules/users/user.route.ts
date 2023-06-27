import express from 'express';
import { UserController } from './user.controller';
import requestValidation from '../../../middleware/requestValidation';
import { UserValidation } from './user.validation';
const router = express.Router();

router.get('/all-users', UserController.getAllUsers);
router.get('/single-user/:id', UserController.getSingleUser);
router.patch(
  '/update-user/:id',
  requestValidation(UserValidation.updateUserzodValidationSchema),
  UserController.updateSingleUser
);
router.delete('/delete-user/:id', UserController.deleteSingleUser);
export const UserRoutes = router;
