import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IBoard, UpdateBoardOptions } from "../../../types/api/boards";
import { updateBoard } from "../../../services/api/boardsApi";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation<IBoard, Error, UpdateBoardOptions>({
    mutationFn: updateBoard,
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ["boards-list-by-user"] });
      queryClient.invalidateQueries({ queryKey: ["board-by-id", boardId] });
    },
  });
};
