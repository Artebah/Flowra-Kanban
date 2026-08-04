import { useQuery } from "@tanstack/react-query";
import { getBoardsListByUser } from "../../../services/api/boardsApi";
import type { TBoardsList } from "../../../types/api/boards";

export const useBoardsList = (userId?: string) => {
  return useQuery<TBoardsList, Error>({
    queryKey: ["boards-list-by-user", userId],
    queryFn: getBoardsListByUser,
    staleTime: Infinity,
    enabled: Boolean(userId),
    retry: false,
  });
};
