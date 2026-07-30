import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BoardColumn, PatchColumnOptions } from "../../../types/api/columns";
import { patchColumn } from "../../../services/api/columnsApi";

export const usePatchColumn = () => {
  const queryClient = useQueryClient();

  return useMutation<BoardColumn, Error, PatchColumnOptions>({
    mutationFn: patchColumn,
    onSuccess: ({ boardId }) => {
      queryClient.invalidateQueries({
        queryKey: ["boards", boardId, "tasks"],
      });
    },
  });
};
