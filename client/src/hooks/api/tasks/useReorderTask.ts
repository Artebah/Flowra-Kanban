import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  ITask,
  ServerUpdateTaskOrderOptions,
} from "../../../types/api/tasks";
import { updateTaskOrder } from "../../../services/api/tasksApi";

export const useServerUpdateTaskOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ServerUpdateTaskOrderOptions>({
    mutationFn: updateTaskOrder,
    onSuccess(_, { boardId, taskId, dto }) {
      queryClient.setQueryData<ITask[]>(["board-tasks", boardId], (prev) =>
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
