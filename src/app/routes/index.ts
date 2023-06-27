import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { CowRoutes } from '../modules/cows/cow.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { OrderRoutes } from '../modules/orders/order.route';
import { AdminRoutes } from '../modules/Admin/admin.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/admins',
    route: AdminRoutes,
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
