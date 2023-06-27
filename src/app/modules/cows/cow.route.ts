import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { CowController } from './cow.controller';
import { CowValidation } from './cow.validation';
const router = express.Router();
router.post(
  '/create-cow',
  requestValidation(CowValidation.createCowzodValidationSchema),
  CowController.createCow
);
router.get('/all-cows', CowController.getAllCows);
router.get('/single-cow/:id', CowController.getSingleCow);
router.patch(
  '/update-cow/:id',
  requestValidation(CowValidation.updateCowzodValidationSchema),
  CowController.updateCow
);
router.delete('/delete-cow/:id', CowController.deleteCow);

export const CowRoutes = router;
