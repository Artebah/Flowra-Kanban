import { removeAttachment } from "@/services/api/tasksApi";
import type { RemoveAttachmentOptions, TaskAttachment } from "@/types/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveAttachment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (options: RemoveAttachmentOptions) => removeAttachment(options),
    onSuccess: (_, { boardId, taskId, dto }) => {
      queryClient.setQueryData<TaskAttachment[]>(
        ["task-attachments", boardId, taskId],
        (prev) => prev?.filter((a) => a.id !== dto.attachmentId) ?? []
      );
    },
  });
};
