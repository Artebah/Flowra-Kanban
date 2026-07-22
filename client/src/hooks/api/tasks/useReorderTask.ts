import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ITask, ReorderTaskOptions } from "../../../types/api/tasks";
import { reorderTask } from "../../../services/api/tasksApi";

export const useReorderTask = () => {
  const queryClient = useQueryClient();

  const query = useMutation<void, Error, ReorderTaskOptions>({
    mutationFn: (options) => reorderTask(options),
    onSuccess(_, { boardId, taskId, updateTaskOrderDto }) {
      queryClient.setQueryData<ITask[]>(
        ["board-tasks", boardId],
        (prev) =>
          prev?.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  order: updateTaskOrderDto.order,
                  columnId: updateTaskOrderDto.columnId,
                }
              : task
          )
      );
    },
  });

  return query;
};
