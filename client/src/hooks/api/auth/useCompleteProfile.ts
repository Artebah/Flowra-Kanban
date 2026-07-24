import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeProfile } from "../../../services/api/authApi";
import type { CompleteProfileOptions, User } from "../../../types/api/auth";

export const useCompleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, CompleteProfileOptions>({
    mutationFn: (options: CompleteProfileOptions) => completeProfile(options),
    onSuccess: (user) => {
      queryClient.setQueryData(["authMe"], user);
    },
  });
};
