import { useMutation } from "@tanstack/react-query";
import { fetchMe } from "../../services/api/authApi";
import { useSetUser } from "../../store/auth/selectors";
import type { User } from "../../types/api/auth";

export const useFetchUser = () => {
  const setUser = useSetUser();

  return useMutation<Awaited<User>, Error, void>({
    mutationFn: fetchMe,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      console.error("FetchMe failed:", error.message);
    },
  });
};
