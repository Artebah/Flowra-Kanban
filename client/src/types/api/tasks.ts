import type { User } from "./auth";
import type { BoardColumn } from "./columns";
import { type JSONContent } from "@tiptap/react";
import type { ILabel } from "./labels";

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
  descriptionContent: JSONContent | null;
  descriptionSearch: string;
  order: number;
  columnId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  assignedMembers: User[];
  assignedLabels: ILabel[];
}

export interface ITaskDetails extends ITask {
  column: BoardColumn;
}

export interface CreateTaskDto {
  title: string;
}

export interface CreateTaskOptions {
  createTaskDto: CreateTaskDto;
  boardId: string;
  columnId: string;
}

export interface GetAllTasksOptions {
  boardId: string;
}

export interface GetTaskDetailsOptions {
  boardId: string;
  taskId: string;
}

export interface UpdateTaskOrderDto {
  columnId: string;
  order: number;
}

export interface ReorderTaskOptions {
  boardId: string;
  taskId: string;
  updateTaskOrderDto: UpdateTaskOrderDto;
}

export interface UpdateTaskDto {
  title?: string;
  isCompleted?: boolean;
  descriptionContent?: JSONContent;
}

export interface UpdateTaskOptions {
  boardId: string;
  taskId: string;
  updateTaskDto: UpdateTaskDto;
}

export interface AssignLabelsDto {
  labelsIds: string[];
}

export interface AssignLabelsOptions {
  boardId: string;
  taskId: string;
  dto: AssignLabelsDto;
}

export interface DeleteTaskOptions {
  boardId: string;
  taskId: string;
}
