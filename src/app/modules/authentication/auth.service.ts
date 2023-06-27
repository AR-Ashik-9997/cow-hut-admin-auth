import { IUser } from '../users/user.interface';
import { User } from '../users/user.model';

const createUser = async (payload: IUser): Promise<IUser> => {
  if (payload.role === 'buyer' && payload.income > 0 && payload.budget >= 0) {
    throw new Error('budget must be required  and income must be 0');
  } else if (
    payload.role === 'seller' &&
    payload.budget > 0 &&
    payload.income >= 0
  ) {
    throw new Error('income must be required  and budget must be 0 ');
  } else {
    const result = await User.create(payload);
    return result;
  }
};

export const authService = { createUser };
