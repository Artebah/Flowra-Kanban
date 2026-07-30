import { useQuery } from "@tanstack/react-query";
import { getBoardById } from "../../../services/api/boardsApi";
import type { BoardByIdResponse, GetBoardByIdOptions } from "../../../types/api/boards";

export const useBoardById = ({ boardId }: GetBoardByIdOptions) => {
  return useQuery<BoardByIdResponse, Error>({
    queryKey: ["board-by-id", boardId],
    queryFn: () => getBoardById({ boardId }),
    staleTime: Infinity,
    retry: false,
  });
};
