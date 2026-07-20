import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/api/auth";
import { getBoardMembers } from "@/services/api/boardsApi";

export const useGetBoardMembers = (boardId: string | null) => {
  return useQuery<User[], Error>({
    queryKey: ["board-members", boardId],
    queryFn: () => getBoardMembers({ boardId: boardId! }),
    enabled: boardId !== null,
    staleTime: Infinity,
    retry: false,
  });
};
