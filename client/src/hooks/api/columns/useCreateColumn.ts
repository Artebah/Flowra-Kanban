import { useMutation } from "@tanstack/react-query";
import type { BoardColumn, CreateColumnDto } from "../../../types/api/columns";
import { createColumn } from "../../../services/api/columnsApi";

interface CreateColumnParams {
  boardId: string;
  createColumnDto: CreateColumnDto;
}

export const useCreateColumn = () => {
  const query = useMutation<BoardColumn, Error, CreateColumnParams>({
    mutationFn: (params) =>
      createColumn(params.boardId, params.createColumnDto),
  });

  return query;
};
