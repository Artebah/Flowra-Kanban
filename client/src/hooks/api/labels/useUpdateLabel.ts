import { updateLabel } from "@/services/api/labelsApi";
import type {
  UpdateLabelOptions,
  UpdateLabelResponse,
} from "@/types/api/labels";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateLabel = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<UpdateLabelResponse, Error, UpdateLabelOptions>({
    mutationFn: (updateLabelOptions) => updateLabel(updateLabelOptions),
    onSuccess: ({ labels, assignedLabels }, { boardId, taskId }) => {
      queryClient.setQueryData(["labels-list", boardId], labels);
      queryClient.setQueryData(
        ["assigned-labels", boardId, taskId],
        assignedLabels
      );
    },
  });

  return mutation;
};
