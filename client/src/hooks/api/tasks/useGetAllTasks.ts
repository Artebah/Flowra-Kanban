import { useQuery } from "@tanstack/react-query";
import type { TTasksList } from "../../../types/api/tasks";
import { getAllTasks } from "../../../services/api/tasksApi";

export const useGetAllTasks = (boardId: string) => {
  const query = useQuery<TTasksList, Error>({
    queryKey: [`board-tasks-${boardId}`],
    queryFn: () => getAllTasks({ boardId }),
    staleTime: Infinity,
    retry: false,
  });

  return query;
};
