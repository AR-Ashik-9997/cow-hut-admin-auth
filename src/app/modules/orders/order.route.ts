import express from 'express';
import { OrderController } from './order.controller';
import requestValidation from '../../../middleware/requestValidation';
import { OrderValidation } from './order.validation';
const router = express.Router();

router.post(
  '/create-order',
  requestValidation(OrderValidation.createOrderzodValidationSchema),
  OrderController.createOrder
);
router.get('/all-orders', OrderController.getAllOrders);
export const OrderRoutes = router;
