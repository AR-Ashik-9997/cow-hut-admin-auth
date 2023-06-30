import httpStatus from 'http-status';
import { IAdmin, IAdminLoginResponse, ILoginAdmin } from './admin.interface';
import { Admin } from './admin.model';
import ApiError from '../../../eroors/apiErrorHandler';
import { jwtHelper } from '../../../helper/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createAdmin = async (payload: IAdmin): Promise<IAdmin> => {
  const result = await Admin.create(payload);
  return result;
};
const LoginAdmin = async (
  payload: ILoginAdmin
): Promise<IAdminLoginResponse> => {
  const { phoneNumber, password } = payload;
  const adminUser = new Admin();
  const isExistUser = await adminUser.isExistPhoneNumber(phoneNumber);
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (
    isExistUser.password &&
    !(await bcrypt.compare(password, isExistUser.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }

  const { _id: _id } = (await Admin.findOne(
    { phoneNumber: phoneNumber },
    { _id: 1 }
  ).lean()) as { _id: string };
  const { role } = isExistUser;
  const accessToken = jwtHelper.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelper.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return { accessToken, refreshToken };
};
export const AdminService = { createAdmin, LoginAdmin };
