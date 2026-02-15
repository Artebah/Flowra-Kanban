import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../../services/api/authApi";
import type { AuthResponse, SignupDto } from "../../../types/api/auth";
import { useSetUser } from "../../../store/auth/selectors";
import { useNavigate } from "react-router";
import { routes } from "../../../constants/routes";

export const useSignup = () => {
  const setUser = useSetUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, SignupDto>({
    mutationFn: (signupDto) => signup(signupDto),
    onSuccess: (authRes) => {
      setUser(authRes.user);
      localStorage.setItem("accessToken", authRes.accessToken);
      localStorage.setItem("refreshToken", authRes.refreshToken);

      queryClient.invalidateQueries({ queryKey: ["authMe"] });
      navigate(routes.home);
    },
  });
};
