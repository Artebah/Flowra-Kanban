import type { ITask } from "./ITask";

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IColumnWithTasks extends IColumn {
  tasks: ITask[];
}
