import type { ITask } from "../../types/ITask";
import type { ITasksByColumn } from "../../types/ITasksByColumn";
import type { IColumn } from "../../types/IColumn";

export interface ModalDetailsData {
  isOpen: boolean;
  columnId: string | null;
}

export interface IKanbanStore {
  tasks: ITask[];
  tasksByColumn: ITasksByColumn;
  columns: IColumn[];
  modalDetailsData: ModalDetailsData;
  setTasks: (tasks: ITask[]) => void;
  setColumns: (columns: IColumn[]) => void;
  updateTaskOrder: (overId: string) => void;
  updateColumnOrder: (activeId: string, overId: string) => void;
  moveTask: (activeId: string, overId: string) => void;
  addTask: (title: string, columnId: string) => void;
  addNewColumn: (title: string) => void;
  removeColumn: (columnId: string) => void;
  updateColumn: (
    columnId: string,
    columnDataToUpdate: Partial<IColumn>
  ) => void;
  updateModalDetailsData: (data: ModalDetailsData) => void;
}
