import type {ITask} from "../../types/ITask";
import type {ITasksByColumn} from "../../types/ITasksByColumn";
import type {IColumn} from "../../types/IColumn";

export interface IKanbanStore {
    tasks: ITask[];
    tasksByColumn: ITasksByColumn;
    columns: IColumn[];
    setTasks: (tasks: ITask[]) => void;
    setColumns: (columns: IColumn[]) => void;
    updateTaskOrder: (overId: string) => void;
    updateColumnOrder: (activeId: string, overId: string) => void;
    moveTask: (activeId: string, overId: string) => void;
    addTask: (title: string, columnId: string) => void;
}
