import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ITaskDetails, UpdateTaskOptions } from "../../../types/api/tasks";
import { updateTask } from "../../../services/api/tasksApi";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const query = useMutation<ITaskDetails, Error, UpdateTaskOptions>({
    mutationFn: (options) => updateTask(options),
    onSuccess(data, variables) {
      console.log(data);
      queryClient.setQueryData(
        ["boards", variables.boardId, "tasks", variables.taskId],
        [data]
      );
    },
  });

  return query;
};
