import { useQuery } from "@tanstack/react-query";
import type {
  GetTaskDetailsOptions,
  ITaskDetails,
} from "../../../types/api/tasks";
import { getTaskDetails } from "../../../services/api/tasksApi";

export const useGetTaskDetails = ({
  boardId,
  taskId,
}: GetTaskDetailsOptions) => {
  const query = useQuery<ITaskDetails | null, Error>({
    queryKey: [`board-tasks-${boardId}-${taskId}`],
    queryFn: () => getTaskDetails({ boardId, taskId }),
    staleTime: Infinity,
    retry: false,
    enabled: Boolean(boardId && taskId),
  });

  return query;
};
