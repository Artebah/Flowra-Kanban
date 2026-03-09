export interface ITask {
  id: string;
  title: string;
  description?: string;
  order: number;
  columnId: string;
}

export interface CreateTaskDto {
  title: string;
}

export interface CreateTaskOptions {
  createTaskDto: CreateTaskDto;
  boardId: string;
  columnId: string;
}
