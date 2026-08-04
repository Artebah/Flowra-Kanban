import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "../../../services/api/boardsApi";
import type { DeleteBoardOptions } from "../../../types/api/boards";
import { useAuthStore } from "../../../store/auth/useAuthStore";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation<void, Error, DeleteBoardOptions>({
    mutationFn: deleteBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards-list-by-user", userId] });
    },
  });
};
