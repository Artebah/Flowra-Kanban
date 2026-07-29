import { createLabelAndAssignToTask } from "@/services/api/labelsApi";
import type {
  CreateLabelAndAssignToTaskOptions,
  CreateLabelAndAssignToTaskResponse,
} from "@/types/api/labels";
import type { ITask } from "@/types/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateLabelAndAssignToTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreateLabelAndAssignToTaskResponse,
    Error,
    CreateLabelAndAssignToTaskOptions
  >({
    mutationFn: (options) => createLabelAndAssignToTask(options),
    onSuccess: ({ labels, assignedLabels }, { boardId, taskId }) => {
      queryClient.setQueryData(["labels-list", boardId], labels);
      queryClient.setQueryData(
        ["assigned-labels", boardId, taskId],
        assignedLabels
      );

      queryClient.setQueryData(
        ["board-tasks", boardId],
        (oldTasks: ITask[]) => {
          if (!oldTasks) return [];

          return oldTasks.map((oldTask) =>
            oldTask.id === taskId
              ? { ...oldTask, assignedLabels: assignedLabels }
              : oldTask
          );
        }
      );
    },
  });

  return mutation;
};
