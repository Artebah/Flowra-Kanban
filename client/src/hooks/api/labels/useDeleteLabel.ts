import { deleteLabel } from "@/services/api/labelsApi";
import type {
  DeleteLabelOptions,
  DeleteLabelResponse,
} from "@/types/api/labels";
import type { ITask } from "@/types/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteLabel = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteLabelResponse, Error, DeleteLabelOptions>({
    mutationFn: deleteLabel,
    onSuccess: ({ labels, assignedLabels }, { boardId, taskId, labelId }) => {
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
              ? {
                  ...oldTask,
                  assignedLabels: oldTask.assignedLabels.filter(
                    (label) => label.id !== labelId
                  ),
                }
              : oldTask
          );
        }
      );
    },
  });
};
