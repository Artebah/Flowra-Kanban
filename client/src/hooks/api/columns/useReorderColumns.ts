import { useMutation } from "@tanstack/react-query";
import { reorderColumns } from "../../../services/api/columnsApi";
import { useSetColumns } from "../../../store/kanban/selectors";
import type {
  BoardColumn,
  UpdateColumnOrderDto,
} from "../../../types/api/columns";

interface ReorderColumnsParams {
  boardId: string;
  columnsWithUpdatedOrder: BoardColumn[];
}

export const useReorderColumns = () => {
  const setColumns = useSetColumns();

  const query = useMutation<void, Error, ReorderColumnsParams>({
    mutationFn: ({
      boardId,
      columnsWithUpdatedOrder,
    }: ReorderColumnsParams) => {
      const updateColumnDtos = columnsWithUpdatedOrder.map(
        ({ id, order }): UpdateColumnOrderDto => ({ id, order })
      );

      return reorderColumns(boardId, updateColumnDtos);
    },
    onMutate: ({ columnsWithUpdatedOrder }) => {
      setColumns(columnsWithUpdatedOrder);
    },
  });

  return query;
};
