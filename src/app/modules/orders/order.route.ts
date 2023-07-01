import express from 'express';
import { OrderController } from './order.controller';
import requestValidation from '../../../middleware/requestValidation';
import { OrderValidation } from './order.validation';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../enum/user';
const router = express.Router();

router.post(
  '/',
  requestValidation(OrderValidation.createOrderzodValidationSchema),
  auth(ENUM_USER_ROLE.BUYER),
  OrderController.createOrder
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllOrders);
export const OrderRoutes = router;
