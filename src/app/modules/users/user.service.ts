import httpStatus from 'http-status';
import ApiError from '../../../eroors/apiErrorHandler';
import { IUser } from './user.interface';
import { User } from './user.model';
import { jwtHelper } from '../../../helper/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const getAllUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find();
  return result;
};
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateSingleUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const getMyProfile = async (token: string): Promise<IUser | null> => {
  if (!token) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access token is required');
  }
  let verifiedUser = null;
  verifiedUser = jwtHelper.verifyToken(token, config.jwt.secret as Secret);
  if (!verifiedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not authorized');
  }
  const { _id } = verifiedUser;
  const result = await User.findOne(
    { _id },
    { name: 1, phoneNumber: 1, address: 1 }
  ).lean();
  return result;
};
const updateMyProfile = async (
  token: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  if (!token) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access token is required');
  }
  let verifiedUser = null;
  verifiedUser = jwtHelper.verifyToken(token, config.jwt.secret as Secret);
  if (!verifiedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not authorized');
  }
  const { _id: id } = verifiedUser;
  if (payload.password) {
    const hashedPassword = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_round)
    );
    payload.password = hashedPassword;
  }
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    select: 'name phoneNumber address',
  });
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  getMyProfile,
  updateMyProfile,
};
