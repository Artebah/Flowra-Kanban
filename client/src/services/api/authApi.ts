import type {
  AuthResponse,
  CompleteProfileDto,
  LoginDto,
  RefreshResponse,
  SignupDto,
  User,
} from "../../types/api/auth";
import axiosInstance from "./axiosInstance";

export const login = async (loginDto: LoginDto): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/login", loginDto);
  return res.data;
};

export const signup = async (signupDto: SignupDto): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/register", signupDto);
  return res.data;
};

export const fetchMe = async (): Promise<User> => {
  const res = await axiosInstance.get("/users/me", {
    disableErrorToast: true,
  });
  return res.data;
};

export const completeProfile = async (
  userId: string,
  dto: CompleteProfileDto,
): Promise<User> => {
  const res = await axiosInstance.patch(`/users/${userId}/complete-profile`, dto);
  return res.data;
};

export const refresh = async (): Promise<RefreshResponse | void> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (refreshToken) {
    const res = await axiosInstance({
      url: "/auth/refresh",
      method: "POST",
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    return res.data;
  }
};
