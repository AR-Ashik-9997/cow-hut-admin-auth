import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { AdminValidation } from './admin.validation';
import { AdminController } from './admin.controller';

const router = express.Router();
router.post(
  '/create-admin',
  requestValidation(AdminValidation.createAdminzodValidationSchema),
  AdminController.createAdmin
);

export const AdminRoutes = router;
