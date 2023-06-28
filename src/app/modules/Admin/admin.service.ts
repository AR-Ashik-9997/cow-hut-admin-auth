import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (payload: IAdmin): Promise<IAdmin> => {
  const result = await Admin.create(payload);
  return result;
};
const LoginUser = async (payload: string) => {
  return payload;
};

export const AdminService = { createAdmin, LoginUser };