export type IAdminRefreshTokenResponse = {
  accessToken: string;
};

export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
};
