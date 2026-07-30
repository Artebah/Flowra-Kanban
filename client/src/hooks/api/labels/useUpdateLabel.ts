import { updateLabel } from "@/services/api/labelsApi";
import type {
  UpdateLabelOptions,
  UpdateLabelResponse,
} from "@/types/api/labels";
import type { ITask } from "@/types/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateLabelResponse, Error, UpdateLabelOptions>({
    mutationFn: updateLabel,
    onSuccess: (
      { labels, assignedLabels },
      { boardId, taskId, labelId, dto }
    ) => {
      queryClient.setQueryData(["labels-list", boardId], labels);
      queryClient.setQueryData(
        ["assigned-labels", boardId, taskId],
        assignedLabels
      );

      queryClient.setQueryData(
        ["board-tasks", boardId],
        (oldTasks: ITask[]) => {
          if (!oldTasks) return [];

          return oldTasks.map((oldTask) => ({
            ...oldTask,
            assignedLabels: oldTask.assignedLabels.map((label) =>
              label.id === labelId
                ? { ...label, color: dto.color, title: dto.title }
                : label
            ),
          }));
        }
      );
    },
  });
};
