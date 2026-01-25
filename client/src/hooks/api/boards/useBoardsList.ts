import { useQuery } from "@tanstack/react-query";
import { getBoardsListByUser } from "../../../services/api/boardsApi";
import type { TBoardsList } from "../../../types/api/boards";

export const useBoardsList = () => {
  const query = useQuery<TBoardsList, Error>({
    queryKey: ["boards-list-by-user"],
    queryFn: getBoardsListByUser,
    staleTime: Infinity,
    retry: false,
  });

  return query;
};
