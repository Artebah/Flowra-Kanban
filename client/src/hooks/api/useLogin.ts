import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/api/authApi";
import type { AuthResponse, LoginDto } from "../../types/api/auth";
import { useSetUser } from "../../store/auth/selectors";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const setUser = useSetUser();
  const navigate = useNavigate();

  return useMutation<Awaited<AuthResponse>, Error, LoginDto>({
    mutationFn: (loginDto) => login(loginDto),
    onSuccess: (authRes) => {
      setUser(authRes.user);
      localStorage.setItem("accessToken", authRes.accessToken);
      localStorage.setItem("refreshToken", authRes.refreshToken);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
};
