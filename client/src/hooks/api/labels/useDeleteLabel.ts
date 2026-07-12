import { deleteLabel } from "@/services/api/labelsApi";
import type { DeleteLabelOptions, ILabel } from "@/types/api/labels";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteLabel = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ILabel[], Error, DeleteLabelOptions>({
    mutationFn: (deleteLabelOptions) => deleteLabel(deleteLabelOptions),
    onSuccess: (labels, { boardId }) => {
      queryClient.setQueryData(["labels-list", boardId], labels);
    },
  });

  return mutation;
};
