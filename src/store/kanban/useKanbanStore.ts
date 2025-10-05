import { create } from "zustand";
import type { IKanbanStore } from "./types";
import { getTasksByColumn } from "../../utils/getTasksByColumn";
import { getReorderTaskData } from "../../utils/getReorderTaskData";
import { getMoveTaskData } from "../../utils/getMoveTaskData";
import type { ITask } from "../../types/ITask";
import { v4 as uuidv4 } from "uuid";
import { columns as initialColumns } from "../../mock/columns";

export const useKanbanStore = create<IKanbanStore>((set, get) => ({
  tasks: [],
  tasksByColumn: {},
  columns: initialColumns,
  setTasks: (tasks) => set({ tasks, tasksByColumn: getTasksByColumn(tasks) }),
  setColumns: (columns) => set({ columns }),
  updateTaskOrder: (overId) => {
    const tasksByColumn = get().tasksByColumn;

    const reorderTaskData = getReorderTaskData(tasksByColumn, overId);

    if (!reorderTaskData) return;

    const { columnId, newOrder, task } = reorderTaskData;

    const updatedColumn = tasksByColumn[columnId].map((t) =>
      t.id === task.id ? { ...task, order: newOrder, columnId: columnId } : t
    );

    set({ tasksByColumn: { ...tasksByColumn, [columnId]: updatedColumn } });

    //* send request to update order and columnId
    //console.log("new task order", newOrder);
    //console.log("new task column", columnId);
  },
  updateColumnOrder: (activeId, overId) => {
    const columns = get().columns;
    const oldIndex = columns.findIndex(
      (col) => `sortable-column-${col.id}` === activeId
    );
    const newIndex = columns.findIndex(
      (col) => `sortable-column-${col.id}` === overId
    );
    if (oldIndex === -1 || newIndex === -1) return;
    const updated = [...columns];
    const [moved] = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, moved);
    set({ columns: updated });
  },
  moveTask: (activeId, overId) => {
    const tasksByColumn = get().tasksByColumn;

    const moveTaskData = getMoveTaskData(tasksByColumn, activeId, overId);

    if (!moveTaskData) return;

    const { activeColId, activeIndex, overColId, overIndex } = moveTaskData;

    if (!activeColId || !overColId) return; // ничего не нашли — не трогаем state

    // вычисляем индекс вставки с учётом удаления active (если в той же колонке индекс смещается)
    const insertionIndex = overIndex;
    if (activeColId === overColId && activeIndex === insertionIndex) return;

    // реальная перестановка — создаём новый state
    const activeTaskObj = tasksByColumn[activeColId][activeIndex];
    const newState = { ...tasksByColumn };
    newState[activeColId] = tasksByColumn[activeColId].filter(
      (t) => t.id !== activeId
    );
    const targetCol = [...newState[overColId]];
    targetCol.splice(insertionIndex, 0, activeTaskObj);
    newState[overColId] = targetCol;

    set({ tasksByColumn: newState });
  },
  addTask: (title, columnId) => {
    const tasksByColumn = get().tasksByColumn;

    const lastTaskInColumn =
      tasksByColumn[columnId][tasksByColumn[columnId].length - 1];

    const newTask: ITask = {
      columnId,
      title,
      order: lastTaskInColumn?.order + 1 || 0,
      id: uuidv4(),
    };

    const updatedTasksByColumn = {
      ...tasksByColumn,
      [columnId]: [...tasksByColumn[columnId], newTask],
    };

    set({ tasksByColumn: updatedTasksByColumn });
  },
}));
