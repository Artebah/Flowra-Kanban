import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "../../../services/api/boardsApi";
import type { DeleteBoardOptions } from "../../../types/api/boards";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteBoardOptions>({
    mutationFn: deleteBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards-list-by-user"] });
    },
  });
};
