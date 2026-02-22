import { useMutation } from "@tanstack/react-query";
import { deleteColumn } from "../../../services/api/columnsApi";

interface DeleteColumnParams {
  boardId: string;
  columnId: string;
}

export const useDeleteColumn = () => {
  const query = useMutation<void, Error, DeleteColumnParams>({
    mutationFn: (params) => deleteColumn(params.boardId, params.columnId),
  });

  return query;
};
