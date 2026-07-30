import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTaskOptions, ITask } from "../../../types/api/tasks";
import { createTask } from "../../../services/api/tasksApi";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<ITask, Error, CreateTaskOptions>({
    mutationFn: createTask,
    onSuccess: (task, { boardId }) => {
      queryClient.setQueryData<ITask[]>(["board-tasks", boardId], (prev) =>
        prev ? [...prev, task] : [task]
      );
    },
  });
};
