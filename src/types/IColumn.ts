import type { ITask } from "./ITask";

export interface IColumn {
  id: string;
  title: string;
  order: number;
  color?: string;
}

export interface IColumnWithTasks extends IColumn {
  tasks: ITask[];
}
