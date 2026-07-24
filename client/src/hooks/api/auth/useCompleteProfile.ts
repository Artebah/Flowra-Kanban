import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeProfile } from "../../../services/api/authApi";
import type { CompleteProfileDto, User } from "../../../types/api/auth";

export const useCompleteProfile = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, CompleteProfileDto>({
    mutationFn: (dto) => completeProfile(userId, dto),
    onSuccess: (user) => {
      queryClient.setQueryData(["authMe"], user);
    },
  });
};
