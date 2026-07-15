import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "../../../services/api/boardsApi";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, string>({
    mutationFn: (boardId) => deleteBoard(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards-list-by-user"] });
    },
  });

  return mutation;
};
