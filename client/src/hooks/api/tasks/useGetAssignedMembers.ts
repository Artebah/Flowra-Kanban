import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/api/auth";
import { getAssignedMembers } from "@/services/api/tasksApi";

export const useGetAssignedMembers = (
  boardId: string | null,
  taskId: string | null
) => {
  return useQuery<User[], Error>({
    queryKey: ["assigned-members", boardId, taskId],
    queryFn: () =>
      getAssignedMembers({ boardId: boardId!, taskId: taskId! }),
    enabled: boardId !== null && taskId !== null,
    staleTime: Infinity,
    retry: false,
  });
};
