import { useQuery } from "@tanstack/react-query";
import type { ILabel } from "@/types/api/labels";
import { getAssignedLabels } from "@/services/api/labelsApi";

interface UseGetAssignedLabelsOptions {
  boardId: string | null;
  taskId: string | null;
}

export const useGetAssignedLabels = ({ boardId, taskId }: UseGetAssignedLabelsOptions) => {
  return useQuery<ILabel[], Error>({
    queryKey: ["assigned-labels", boardId, taskId],
    queryFn: () => getAssignedLabels({ boardId: boardId!, taskId: taskId! }),
    enabled: boardId !== null && taskId !== null,
    staleTime: Infinity,
    retry: false,
  });
};
