import { getAllUsers } from "@/services/api/usersApi";
import type { User } from "@/types/api/auth";
import type { GetAllUsersOptions } from "@/types/api/users";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = (query: GetAllUsersOptions) => {
  return useQuery<User[], Error>({
    queryKey: ["users-list"],
    queryFn: () => getAllUsers(query),
    staleTime: Infinity,
    retry: false,
  });
};
