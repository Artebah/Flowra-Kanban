import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/api/auth";
import { getBoardMembers } from "@/services/api/boardsApi";

interface UseGetBoardMembersOptions {
  boardId: string | null;
}

export const useGetBoardMembers = ({ boardId }: UseGetBoardMembersOptions) => {
  return useQuery<User[], Error>({
    queryKey: ["board-members", boardId],
    queryFn: () => getBoardMembers({ boardId: boardId! }),
    enabled: boardId !== null,
    staleTime: Infinity,
    retry: false,
  });
};
