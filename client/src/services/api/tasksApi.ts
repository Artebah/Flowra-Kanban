import type {
  CreateTaskOptions,
  GetAllTasksOptions,
  ITask,
  TTasksList,
} from "../../types/api/tasks";
import axiosInstance from "./axiosInstance";

export const createTask = async ({
  createTaskDto,
  boardId,
  columnId,
}: CreateTaskOptions): Promise<ITask> => {
  const res = await axiosInstance.post(
    `boards/${boardId}/columns/${columnId}/tasks`,
    createTaskDto
  );
  return res.data;
};

export const getAllTasks = async ({
  boardId,
}: GetAllTasksOptions): Promise<TTasksList> => {
  const res = await axiosInstance.get(`boards/${boardId}/tasks`);
  return res.data;
};
