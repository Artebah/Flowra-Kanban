import { useMutation } from "@tanstack/react-query";
import { reorderColumns } from "../../../services/api/columnsApi";
import { useSetColumns } from "../../../store/kanban/selectors";
import type {
  BoardColumn,
  UpdateColumnOrderDto,
} from "../../../types/api/columns";
import toast from "react-hot-toast";

interface ReorderColumnsParams {
  boardId: string;
  updatedColumns: BoardColumn[];
  previousColumns: BoardColumn[];
}

interface MutationContext {
  previousColumns?: BoardColumn[];
}

export const useReorderColumns = () => {
  const setColumns = useSetColumns();

  const query = useMutation<void, Error, ReorderColumnsParams, MutationContext>(
    {
      mutationFn: ({ boardId, updatedColumns }) => {
        const payload = updatedColumns.map(
          ({ id, order }): UpdateColumnOrderDto => ({ id, order })
        );
        return reorderColumns(boardId, payload);
      },

      onMutate: async ({ previousColumns }) => {
        return { previousColumns };
      },

      onError: (err, _variables, context) => {
        if (context?.previousColumns) {
          setColumns(context.previousColumns);
        }
        toast.error(`Couldn't update column order: ${err.message}`);
      },
    }
  );

  return query;
};
