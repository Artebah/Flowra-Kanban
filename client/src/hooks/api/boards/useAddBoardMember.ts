import { addBoardMember } from "@/services/api/boardsApi";
import type { User } from "@/types/api/auth";
import type { AddBoardMemberOptions } from "@/types/api/boards";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddBoardMember = () => {
  const queryClient = useQueryClient();

  return useMutation<User[], Error, AddBoardMemberOptions>({
    mutationFn: addBoardMember,
    onSuccess: (data, { boardId }) => {
      queryClient.setQueryData(["board-members", boardId], data);
    },
  });
};
