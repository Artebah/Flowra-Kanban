import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../../services/api/authApi";
import type { AuthResponse, SignupOptions } from "../../../types/api/auth";
import { useHandleSuccessAuth } from "@/hooks/useHandleSuccessAuth";

export const useSignup = () => {
  const queryClient = useQueryClient();
  const handleSuccessAuth = useHandleSuccessAuth();

  return useMutation<AuthResponse, Error, SignupOptions>({
    mutationFn: signup,
    onSuccess: (authResponse) => {
      handleSuccessAuth(authResponse);
      queryClient.invalidateQueries({ queryKey: ["authMe"] });
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
    },
  });
};
