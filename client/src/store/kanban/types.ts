import type { ITask } from "../../types/ITask";
import type { ITasksByColumn } from "../../types/ITasksByColumn";
import type { IColumn } from "../../types/IColumn";

export interface ModalDetailsData {
  isOpen: boolean;
  columnId: string | null;
}

export interface IColumnSlice {
  columns: IColumn[];
  setColumns: (columns: IColumn[]) => void;
  updateColumnOrder: (activeId: string, overId: string) => void;
  addNewColumn: (title: string) => void;
  removeColumn: (columnId: string) => void;
  updateColumn: (
    columnId: string,
    columnDataToUpdate: Partial<IColumn>
  ) => void;
}

export interface ITaskSlice {
  tasks: ITask[];
  tasksByColumn: ITasksByColumn;
  setTasks: (tasks: ITask[]) => void;
  updateTaskOrder: (overId: string) => void;
  moveTask: (activeId: string, overId: string) => void;
  addTask: (title: string, columnId: string) => void;
}

export interface IUISlice {
  modalDetailsData: ModalDetailsData;
  updateModalDetailsData: (data: ModalDetailsData) => void;
}

export interface IKanbanStore extends IColumnSlice, ITaskSlice, IUISlice {}
