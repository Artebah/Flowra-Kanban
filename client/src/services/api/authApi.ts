import type {
  AuthResponse,
  CompleteProfileOptions,
  LoginOptions,
  RefreshResponse,
  SignupOptions,
  User,
} from "../../types/api/auth";
import axiosInstance from "./axiosInstance";

export const login = async ({ dto }: LoginOptions): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/login", dto);
  return res.data;
};

export const signup = async ({ dto }: SignupOptions): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/register", dto);
  return res.data;
};

export const fetchMe = async (): Promise<User> => {
  const res = await axiosInstance.get("/users/me", {
    disableErrorToast: true,
  });
  return res.data;
};

export const completeProfile = async ({
  dto,
  userId,
}: CompleteProfileOptions): Promise<User> => {
  const res = await axiosInstance.patch(
    `/users/${userId}/complete-profile`,
    dto
  );
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
