import { useQuery } from "@tanstack/react-query";
import type { ILabel } from "@/types/api/labels";
import { getAssignedLabels } from "@/services/api/labelsApi";

export const useGetAssignedLabels = (
  boardId: string | null,
  taskId: string | null
) => {
  const query = useQuery<ILabel[], Error>({
    queryKey: ["assigned-labels", boardId, taskId],
    queryFn: () => getAssignedLabels({ boardId: boardId!, taskId: taskId! }),
    enabled: boardId !== null && taskId !== null,
    staleTime: Infinity,
    retry: false,
  });
  return query;
};
