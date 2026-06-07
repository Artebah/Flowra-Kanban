import { useMutation } from "@tanstack/react-query";
import type { UpdateTaskOptions } from "../../../types/api/tasks";
import { updateTask } from "../../../services/api/tasksApi";

export const useUpdateTask = () => {
  const query = useMutation<void, Error, UpdateTaskOptions>({
    mutationFn: (options) => updateTask(options),
  });

  return query;
};
