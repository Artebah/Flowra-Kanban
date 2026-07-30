import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ITask, ReorderTaskOptions } from "../../../types/api/tasks";
import { reorderTask } from "../../../services/api/tasksApi";

export const useReorderTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ReorderTaskOptions>({
    mutationFn: reorderTask,
    onSuccess(_, { boardId, taskId, dto }) {
      queryClient.setQueryData<ITask[]>(
        ["board-tasks", boardId],
        (prev) =>
          prev?.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  order: dto.order,
                  columnId: dto.columnId,
                }
              : task
          )
      );
    },
  });
};
