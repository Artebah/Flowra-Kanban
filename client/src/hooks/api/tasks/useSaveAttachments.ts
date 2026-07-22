import { saveAttachments } from "@/services/api/tasksApi";
import type { SaveAttachmentsOptions } from "@/types/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveAttachments = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (options: SaveAttachmentsOptions) => saveAttachments(options),
    onSuccess: (data, { boardId, taskId }) => {
      queryClient.setQueryData(["task-attachments", boardId, taskId], data);
    },
  });

  return mutation;
};
