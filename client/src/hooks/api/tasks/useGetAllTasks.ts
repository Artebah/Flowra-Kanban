import { useQuery } from "@tanstack/react-query";
import type { ITask } from "../../../types/api/tasks";
import { getAllTasks } from "../../../services/api/tasksApi";

export const useGetAllTasks = (boardId: string) => {
  const query = useQuery<ITask[], Error>({
    queryKey: [`board-tasks-${boardId}`],
    queryFn: () => getAllTasks({ boardId }),
    staleTime: Infinity,
    retry: false,
  });

  return query;
};
