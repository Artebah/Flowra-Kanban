import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../services/api/authApi";
import type { AuthResponse, LoginOptions } from "../../../types/api/auth";
import { useHandleSuccessAuth } from "@/hooks/useHandleSuccessAuth";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const handleSuccessAuth = useHandleSuccessAuth();

  return useMutation<AuthResponse, Error, LoginOptions>({
    mutationFn: login,
    onSuccess: (authResponse) => {
      handleSuccessAuth(authResponse);
      queryClient.invalidateQueries({ queryKey: ["authMe"] });
    },
  });
};
