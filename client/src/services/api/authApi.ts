import type { AuthResponse, LoginDto, SignupDto } from "../../types/api/auth";
import axiosInstance from "./axiosInstance";

export const login = async (loginDto: LoginDto): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/login", loginDto);
  return res.data;
};

export const signup = async (signupDto: SignupDto): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/register", signupDto);
  return res.data;
};
