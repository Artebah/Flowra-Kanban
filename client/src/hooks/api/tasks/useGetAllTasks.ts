import { useQuery } from "@tanstack/react-query";
import type { GetAllTasksOptions, ITask } from "../../../types/api/tasks";
import { getAllTasks } from "../../../services/api/tasksApi";

export const useGetAllTasks = ({ boardId }: GetAllTasksOptions) => {
  return useQuery<ITask[], Error>({
    queryKey: ["board-tasks", boardId],
    queryFn: () => getAllTasks({ boardId }),
    staleTime: Infinity,
    retry: false,
  });
};
