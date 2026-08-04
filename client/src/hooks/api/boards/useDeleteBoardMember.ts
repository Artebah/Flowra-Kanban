import { deleteBoardMember } from "@/services/api/boardsApi";
import type { DeleteBoardMemberOptions } from "@/types/api/boards";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBoardMember = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteBoardMemberOptions>({
    mutationFn: deleteBoardMember,
    onSuccess: (_, { boardId, memberId }) => {
      queryClient.setQueryData<{ id: string }[]>(
        ["board-members", boardId],
        (prev) => prev?.filter((member) => member.id !== memberId),
      );
    },
  });
};
