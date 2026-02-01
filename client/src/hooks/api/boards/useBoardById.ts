import { useQuery } from "@tanstack/react-query";
import { getBoardById } from "../../../services/api/boardsApi";
import type { BoardByIdResponse } from "../../../types/api/boards";

export const useBoardById = (boardId: string) => {
  const query = useQuery<BoardByIdResponse, Error>({
    queryKey: ["board-by-id", boardId],
    queryFn: () => getBoardById(boardId),
    staleTime: Infinity,
    retry: false,
  });

  return query;
};
