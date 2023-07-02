import httpStatus from 'http-status';
import ApiError from '../../../eroors/apiErrorHandler';
import { IUser } from './user.interface';

import { User } from './user.model';

import config from '../../../config';

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

const getMyProfile = async (id: string): Promise<IUser | null> => {
  const verifiedUser = await User.findById(id);
  if (!verifiedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await User.findOne(
    { _id: id },
    { name: 1, phoneNumber: 1, address: 1 }
  ).lean();
  return result;
};
const updateMyProfile = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const verifiedUser = await User.findById(id);
  if (!verifiedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
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
