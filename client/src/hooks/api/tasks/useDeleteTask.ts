import { useMutation } from "@tanstack/react-query";
import type { DeleteTaskOptions } from "../../../types/api/tasks";
import { deleteTask } from "../../../services/api/tasksApi";

export const useDeleteTask = () => {
  const query = useMutation<void, Error, DeleteTaskOptions>({
    mutationFn: (options) => deleteTask(options),
  });

  return query;
};
