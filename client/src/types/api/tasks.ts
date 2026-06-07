import type { BoardColumn } from "./columns";
import { type JSONContent } from "@tiptap/react";

export interface ITask {
  id: string;
  title: string;
  descriptionContent: JSONContent | null;
  descriptionSearch: string;
  order: number;
  columnId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
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
  descriptionContent?: JSONContent;
}

export interface UpdateTaskOptions {
  boardId: string;
  taskId: string;
  updateTaskDto: UpdateTaskDto;
}
