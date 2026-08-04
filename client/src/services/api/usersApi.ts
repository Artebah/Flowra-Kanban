import type { User } from "@/types/api/auth";
import type { GetAllUsersOptions } from "@/types/api/users";
import axiosInstance from "./axiosInstance";

export const getAllUsers = async (
  query: GetAllUsersOptions
): Promise<User[]> => {
  const res = await axiosInstance.get(`/users`, {
    params: {
      ...query,
    },
  });
  return res.data;
};
