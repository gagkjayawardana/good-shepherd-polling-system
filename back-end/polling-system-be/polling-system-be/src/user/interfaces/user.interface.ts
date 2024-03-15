export interface UserInterface {
  userId: number;
  userName: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenType {
  newAccessToken: string;
  newRefreshToken: string;
  tokenData: TokenData;
}

export interface TokenData {
  email: string;
  role: string;
}
