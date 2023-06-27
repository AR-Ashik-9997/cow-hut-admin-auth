import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { CowRoutes } from '../modules/cows/cow.route';
import { AuthRoute } from '../modules/authentication/auth.route';
import { OrderRoutes } from '../modules/orders/order.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
