export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface LoginDto {
  emailOrUsername: string;
  password: string;
}
export interface SignupDto {
  email: string;
  username: string;
  password: string;
}
