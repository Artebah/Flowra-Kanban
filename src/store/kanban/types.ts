import type { ITask } from "../../types/ITask";
import type { ITasksByColumn } from "../../types/ITasksByColumn";

export interface IKanbanStore {
  tasks: ITask[];
  tasksByColumn: ITasksByColumn;
  setTasks: (tasks: ITask[]) => void;
  updateTaskOrder: (overId: string) => void;
  moveTask: (activeId: string, overId: string) => void;
  addTask: (title: string, columnId: string) => void;
}
