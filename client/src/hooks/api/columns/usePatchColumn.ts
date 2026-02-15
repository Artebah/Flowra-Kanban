import { useMutation } from "@tanstack/react-query";
import type { BoardColumn, UpdateColumnDto } from "../../../types/api/columns";
import { patchColumn } from "../../../services/api/columnsApi";

interface PatchColumnParams {
  boardId: string;
  columnId: string;
  updateColumnDto: UpdateColumnDto;
}

export const usePatchColumn = () => {
  const query = useMutation<BoardColumn, Error, PatchColumnParams>({
    mutationFn: (params: PatchColumnParams) =>
      patchColumn(params.boardId, params.columnId, params.updateColumnDto),
  });

  return query;
};
