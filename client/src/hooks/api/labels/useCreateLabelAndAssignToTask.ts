import { createLabelAndAssignToTask } from "@/services/api/labelsApi";
import type {
  CreateLabelAndAssignToTaskOptions,
  ILabel,
} from "@/types/api/labels";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateLabelAndAssignToTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ILabel[],
    Error,
    CreateLabelAndAssignToTaskOptions
  >({
    mutationFn: (options) => createLabelAndAssignToTask(options),
    onSuccess: (labels, { boardId, taskId }) => {
      queryClient.setQueryData(["labels-list", boardId], labels);
      queryClient.invalidateQueries({ queryKey: ["assigned-labels", boardId, taskId] });
    },
  });

  return mutation;
};
