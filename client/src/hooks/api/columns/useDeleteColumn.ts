import { useMutation } from "@tanstack/react-query";
import { deleteColumn } from "../../../services/api/columnsApi";
import type { DeleteColumnOptions } from "../../../types/api/columns";

export const useDeleteColumn = () => {
  return useMutation<void, Error, DeleteColumnOptions>({
    mutationFn: deleteColumn,
  });
};
