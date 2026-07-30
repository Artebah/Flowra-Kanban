import { useQuery } from "@tanstack/react-query";
import { getAttachments } from "@/services/api/tasksApi";
import type { TaskAttachment } from "@/types/api/tasks";

interface UseGetAttachmentsOptions {
  boardId: string | null;
  taskId: string | null;
}

export const useGetAttachments = ({ boardId, taskId }: UseGetAttachmentsOptions) => {
  return useQuery<TaskAttachment[], Error>({
    queryKey: ["task-attachments", boardId, taskId],
    queryFn: () => getAttachments({ boardId: boardId!, taskId: taskId! }),
    enabled: boardId !== null && taskId !== null,
    staleTime: Infinity,
    retry: false,
  });
};
