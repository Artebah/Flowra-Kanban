import { useQuery } from "@tanstack/react-query";
import type { ITask } from "../../../types/api/tasks";
import { getTaskDetails } from "../../../services/api/tasksApi";

export const useGetTaskDetails = (boardId: string, taskId: string) => {
  const query = useQuery<ITask | null, Error>({
    queryKey: [`board-tasks-${boardId}-${taskId}`],
    queryFn: () => getTaskDetails({ boardId, taskId }),
    staleTime: Infinity,
    retry: false,
  });

  return query;
};
