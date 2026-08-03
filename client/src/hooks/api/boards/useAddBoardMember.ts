import { addBoardMember } from "@/services/api/boardsApi";
import type { AddBoardMemberOptions, IBoard } from "@/types/api/boards";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddBoardMember = () => {
  const queryClient = useQueryClient();

  return useMutation<IBoard[], Error, AddBoardMemberOptions>({
    mutationFn: addBoardMember,
    onSuccess: (data, { boardId }) => {
      queryClient.setQueryData(["board-members", boardId], data);
    },
  });
};
