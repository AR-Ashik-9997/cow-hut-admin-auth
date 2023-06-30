export type IRefreshTokenResponse = {
  accessToken: string;
};

export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type IUserLoginResponse = {
  accessToken: string;
  refreshToken?: string;
};
