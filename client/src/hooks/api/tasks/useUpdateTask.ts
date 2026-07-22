import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  ITask,
  ITaskDetails,
  UpdateTaskOptions,
} from "../../../types/api/tasks";
import { updateTask } from "../../../services/api/tasksApi";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const query = useMutation<ITaskDetails, Error, UpdateTaskOptions>({
    mutationFn: (options) => updateTask(options),
    onSuccess(data, variables) {
      queryClient.setQueryData(
        ["boards", variables.boardId, "tasks", variables.taskId],
        data
      );

      queryClient.setQueryData<ITask[]>(
        ["board-tasks", variables.boardId],
        (prev) =>
          prev?.map((task) =>
            task.id === variables.taskId
              ? { ...task, ...data, order: task.order, columnId: task.columnId }
              : task
          )
      );
    },
  });

  return query;
};
