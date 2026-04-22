import type {
  CreateTaskOptions,
  GetAllTasksOptions,
  GetTaskDetailsOptions,
  ITask,
  ReorderTaskOptions,
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
}: GetAllTasksOptions): Promise<ITask[]> => {
  const res = await axiosInstance.get(`boards/${boardId}/tasks`);
  return res.data;
};

export const getTaskDetails = async ({
  boardId,
  taskId,
}: GetTaskDetailsOptions): Promise<ITask | null> => {
  const res = await axiosInstance.get(`boards/${boardId}/tasks/${taskId}`);
  return res.data;
};

export const reorderTask = async ({
  boardId,
  taskId,
  updateTaskOrderDto,
}: ReorderTaskOptions): Promise<void> => {
  await axiosInstance.patch(
    `boards/${boardId}/tasks/${taskId}/reorder`,
    updateTaskOrderDto
  );
};
