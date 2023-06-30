import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { CowController } from './cow.controller';
import { CowValidation } from './cow.validation';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../enum/user';
const router = express.Router();
router.post(
  '/',
  requestValidation(CowValidation.createCowzodValidationSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.createCow
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getAllCows
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getSingleCow
);
router.patch(
  '/:id',
  requestValidation(CowValidation.updateCowzodValidationSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.updateCow
);
router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

export const CowRoutes = router;
