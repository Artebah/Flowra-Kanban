import type { ILabel } from "../../types/api/labels";
import type {
  AssignLabelsOptions,
  AssignMembersOptions,
  CreateTaskOptions,
  DeleteTaskOptions,
  GetAllTasksOptions,
  GetAssignedMembersOptions,
  GetAttachmentsOptions,
  GetTaskDetailsOptions,
  ITask,
  ITaskDetails,
  ReorderTaskOptions,
  RemoveAttachmentOptions,
  SaveAttachmentsOptions,
  TaskAttachment,
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
    `boards/${boardId}/tasks/${taskId}/members/assigned`
  );
  return data;
};

export const assignMembers = async ({
  boardId,
  taskId,
  dto,
}: AssignMembersOptions): Promise<User[]> => {
  const { data } = await axiosInstance.post(
    `boards/${boardId}/tasks/${taskId}/members/assign`,
    dto
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

export const saveAttachments = async ({
  boardId,
  taskId,
  dto,
}: SaveAttachmentsOptions): Promise<TaskAttachment[]> => {
  const { data } = await axiosInstance.post(
    `boards/${boardId}/tasks/${taskId}/attachments/save`,
    dto
  );
  return data;
};

export const getAttachments = async ({
  boardId,
  taskId,
}: GetAttachmentsOptions): Promise<TaskAttachment[]> => {
  const { data } = await axiosInstance.get(
    `boards/${boardId}/tasks/${taskId}/attachments`
  );
  return data;
};

export const removeAttachment = async ({
  boardId,
  taskId,
  dto,
}: RemoveAttachmentOptions): Promise<void> => {
  await axiosInstance.delete(`boards/${boardId}/tasks/${taskId}/attachments`, {
    data: dto,
  });
};
