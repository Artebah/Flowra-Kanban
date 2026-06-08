import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateTaskOptions } from "../../../types/api/tasks";
import { updateTask } from "../../../services/api/tasksApi";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const query = useMutation<void, Error, UpdateTaskOptions>({
    mutationFn: (options) => updateTask(options),
    onSuccess(_data, variables) {
      queryClient.invalidateQueries({
        queryKey: ["boards", variables.boardId, "tasks", variables.taskId],
      });
    },
  });

  return query;
};
