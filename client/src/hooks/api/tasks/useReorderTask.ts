import { useMutation } from "@tanstack/react-query";
import type { ReorderTaskOptions } from "../../../types/api/tasks";
import { reorderTask } from "../../../services/api/tasksApi";

export const useReorderTask = () => {
  const query = useMutation<void, Error, ReorderTaskOptions>({
    mutationFn: (options) => reorderTask(options),
  });

  return query;
};
