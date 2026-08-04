import { useQuery } from "@tanstack/react-query";
import { getBoardMembers } from "@/services/api/boardsApi";
import type { BoardMemberWithUser } from "@/types/api/boards";

interface UseGetBoardMembersOptions {
  boardId: string | null | undefined;
}

export const useGetBoardMembers = ({ boardId }: UseGetBoardMembersOptions) => {
  return useQuery<BoardMemberWithUser[], Error>({
    queryKey: ["board-members", boardId],
    queryFn: () => getBoardMembers({ boardId: boardId! }),
    enabled: boardId !== null,
    staleTime: Infinity,
    retry: false,
  });
};
