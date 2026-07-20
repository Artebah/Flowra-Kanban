import type { ILabel } from "../../types/api/labels";
import type {
  AssignLabelsOptions,
  CreateTaskOptions,
  DeleteTaskOptions,
  GetAllTasksOptions,
  GetAssignedMembersOptions,
  GetTaskDetailsOptions,
  ITask,
  ITaskDetails,
  ReorderTaskOptions,
  UpdateTaskOptions,
} from "../../types/api/tasks";
import type { User } from "../../types/api/auth";
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
}: GetTaskDetailsOptions): Promise<ITaskDetails | null> => {
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

export const updateTask = async ({
  boardId,
  taskId,
  updateTaskDto,
}: UpdateTaskOptions): Promise<ITaskDetails> => {
  const { data } = await axiosInstance.patch(
    `boards/${boardId}/tasks/${taskId}`,
    updateTaskDto
  );

  return data;
};

export const deleteTask = async ({
  boardId,
  taskId,
}: DeleteTaskOptions): Promise<void> => {
  await axiosInstance.delete(`boards/${boardId}/tasks/${taskId}`);
};

export const getAssignedMembers = async ({
  boardId,
  taskId,
}: GetAssignedMembersOptions): Promise<User[]> => {
  const { data } = await axiosInstance.get(
    `boards/${boardId}/tasks/${taskId}/assigned-members`
  );
  return data;
};

export const assignLabels = async ({
  boardId,
  taskId,
  dto,
}: AssignLabelsOptions): Promise<ILabel[]> => {
  const { data } = await axiosInstance.post(
    `boards/${boardId}/tasks/${taskId}/labels/assign`,
    dto
  );
  return data;
};
