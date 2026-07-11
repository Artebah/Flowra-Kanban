import { updateLabel } from "@/services/api/labelsApi";
import type { ILabel, UpdateLabelOptions } from "@/types/api/labels";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateLabel = () => {
  const query = useQueryClient();

  const mutation = useMutation<ILabel[], Error, UpdateLabelOptions>({
    mutationFn: (updateLabelOptions) => updateLabel(updateLabelOptions),
    onSuccess: (labels, { boardId }) => {
      query.setQueryData(["labels-list", boardId], labels);
    },
  });

  return mutation;
};
