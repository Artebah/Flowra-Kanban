import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BoardColumn, UpdateColumnDto } from "../../../types/api/columns";
import { patchColumn } from "../../../services/api/columnsApi";

interface PatchColumnParams {
  boardId: string;
  columnId: string;
  updateColumnDto: UpdateColumnDto;
}

export const usePatchColumn = () => {
  const queryClient = useQueryClient();

  const query = useMutation<BoardColumn, Error, PatchColumnParams>({
    mutationFn: (params: PatchColumnParams) =>
      patchColumn(params.boardId, params.columnId, params.updateColumnDto),
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: [`board-columns-${boardId}`] });
    },
  });

  return query;
};
