import { useMutation } from "@tanstack/react-query";
import { fetchUser } from "../../services/api/authApi";
import { useSetUser } from "../../store/auth/selectors";
import type { User } from "../../types/api/auth";

export const useFetchUser = () => {
  const setUser = useSetUser();

  return useMutation<Awaited<User>, Error, void>({
    mutationFn: fetchUser,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      console.error("FetchUser failed:", error.message);
    },
  });
};
