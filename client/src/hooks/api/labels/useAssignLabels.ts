import { assignLabels } from "@/services/api/tasksApi";
import type { AssignLabelsOptions } from "@/types/api/tasks";
import type { ILabel } from "@/types/api/labels";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAssignLabels = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ILabel[], Error, AssignLabelsOptions>({
    mutationFn: (options) => assignLabels(options),
    onSuccess: (labels, { boardId, taskId }) => {
      queryClient.setQueryData(["assigned-labels", boardId, taskId], labels);
    },
  });

  return mutation;
};
