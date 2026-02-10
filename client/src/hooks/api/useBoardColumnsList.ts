import { useQuery } from "@tanstack/react-query";
import type { TBoardColumns } from "../../types/api/columns";
import { getBoardColumns } from "../../services/api/columnsApi";

export const useBoardColumnsList = (boardId: string) => {
  const query = useQuery<TBoardColumns, Error>({
    queryKey: [`board-columns-${boardId}`],
    queryFn: () => getBoardColumns(boardId),
    staleTime: Infinity,
    retry: false,
  });

  return query;
};
