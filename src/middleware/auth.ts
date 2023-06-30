import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../eroors/apiErrorHandler';
import config from '../config';
import { Secret } from 'jsonwebtoken';
import { jwtHelper } from '../helper/jwtHelper';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not authorized');
      }
      let verifiedUser = null;
      verifiedUser = jwtHelper.verifyToken(token, config.jwt.secret as Secret);
      req.user = verifiedUser;
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
export default auth;
