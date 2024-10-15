export interface IUser {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUserContextType {
  user: IUser | null;
  tokens: IAuthTokens | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setTokens: React.Dispatch<React.SetStateAction<IAuthTokens | null>>;
}

export interface IUserInforEdit {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
}
