import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/api/authApi";
import type { AuthResponse, LoginDto } from "../../types/api/auth";
import { useSetUser } from "../../store/auth/selectors";

export const useLogin = () => {
  const setUser = useSetUser();

  return useMutation<Awaited<AuthResponse>, Error, LoginDto>({
    mutationFn: (loginDto) => login(loginDto),
    onSuccess: (data) => {
      window.localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
};
