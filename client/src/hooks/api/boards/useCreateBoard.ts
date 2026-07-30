import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateBoardOptions, IBoard } from "../../../types/api/boards";
import { createBoard } from "../../../services/api/boardsApi";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation<IBoard, Error, CreateBoardOptions>({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards-list-by-user"] });
    },
  });
};
