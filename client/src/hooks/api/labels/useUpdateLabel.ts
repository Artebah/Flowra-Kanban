import { updateLabel } from "@/services/api/labelsApi";
import type { ILabel, UpdateLabelOptions } from "@/types/api/labels";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateLabel = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ILabel[], Error, UpdateLabelOptions>({
    mutationFn: (updateLabelOptions) => updateLabel(updateLabelOptions),
    onSuccess: (labels, { boardId }) => {
      queryClient.setQueryData(["labels-list", boardId], labels);
    },
  });

  return mutation;
};
