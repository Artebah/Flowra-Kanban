import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateBoardOptions, IBoard } from "../../../types/api/boards";
import { createBoard } from "../../../services/api/boardsApi";
import { useAuthStore } from "../../../store/auth/useAuthStore";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation<IBoard, Error, CreateBoardOptions>({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards-list-by-user", userId] });
    },
  });
};
