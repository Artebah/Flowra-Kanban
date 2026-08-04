import { deleteBoardMember } from "@/services/api/boardsApi";
import type {
  BoardMemberWithUser,
  DeleteBoardMemberOptions,
} from "@/types/api/boards";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBoardMember = () => {
  const queryClient = useQueryClient();

  return useMutation<BoardMemberWithUser[], Error, DeleteBoardMemberOptions>({
    mutationFn: deleteBoardMember,
    onSuccess: (data, { boardId }) => {
      queryClient.setQueryData<{ id: string }[]>(
        ["board-members", boardId],
        data
      );
    },
  });
};
