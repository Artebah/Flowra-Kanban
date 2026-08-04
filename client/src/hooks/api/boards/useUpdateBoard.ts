import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IBoard, UpdateBoardOptions } from "../../../types/api/boards";
import { updateBoard } from "../../../services/api/boardsApi";
import { useAuthStore } from "../../../store/auth/useAuthStore";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation<IBoard, Error, UpdateBoardOptions>({
    mutationFn: updateBoard,
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ["boards-list-by-user", userId] });
      queryClient.invalidateQueries({ queryKey: ["board-by-id", boardId] });
    },
  });
};
