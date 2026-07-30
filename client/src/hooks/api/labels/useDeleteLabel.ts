import { deleteLabel } from "@/services/api/labelsApi";
import type { DeleteLabelOptions, ILabel } from "@/types/api/labels";
import type { ITask } from "@/types/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteLabel = () => {
  const queryClient = useQueryClient();

  return useMutation<ILabel[], Error, DeleteLabelOptions>({
    mutationFn: deleteLabel,
    onSuccess: (labels, { boardId, taskId, labelId }) => {
      queryClient.setQueryData(["labels-list", boardId], labels);
      queryClient.setQueryData(
        ["assigned-labels", boardId, taskId],
        (oldAssigned: ILabel[]) =>
          oldAssigned?.filter((label) => label.id !== labelId) ?? []
      );

      queryClient.setQueryData(
        ["board-tasks", boardId],
        (oldTasks: ITask[]) => {
          if (!oldTasks) return [];

          return oldTasks.map((oldTask) => ({
            ...oldTask,
            assignedLabels: oldTask.assignedLabels.filter(
              (label) => label.id !== labelId
            ),
          }));
        }
      );
    },
  });
};
