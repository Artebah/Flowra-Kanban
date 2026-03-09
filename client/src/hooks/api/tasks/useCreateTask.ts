import { useMutation } from "@tanstack/react-query";
import type { CreateTaskOptions, ITask } from "../../../types/api/tasks";
import { createTask } from "../../../services/api/tasksApi";

export const useCreateTask = () => {
  const query = useMutation<ITask, Error, CreateTaskOptions>({
    mutationFn: (options) => createTask(options),
  });

  return query;
};
