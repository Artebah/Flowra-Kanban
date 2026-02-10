import type { StateCreator } from "zustand";
import { getTasksByColumn } from "../../../utils/getTasksByColumn";
import { getReorderTaskData } from "../../../utils/getReorderTaskData";
import { getMoveTaskData } from "../../../utils/getMoveTaskData";
import { v4 as uuidv4 } from "uuid";
import type { IKanbanStore, ITaskSlice } from "../types";

export const createTaskSlice: StateCreator<IKanbanStore, [], [], ITaskSlice> = (
  set,
  get
) => ({
  tasks: [],
  tasksByColumn: {},
  setTasks: (tasks) => set({ tasks, tasksByColumn: getTasksByColumn(tasks) }),
  updateTaskOrder: (overId) => {
    const { tasksByColumn } = get();
    const reorderTaskData = getReorderTaskData(tasksByColumn, overId);
    if (!reorderTaskData) return;

    const { columnId, newOrder, task } = reorderTaskData;
    const updatedColumn = tasksByColumn[columnId].map((t) =>
      t.id === task.id ? { ...task, order: newOrder, columnId } : t
    );
    set({ tasksByColumn: { ...tasksByColumn, [columnId]: updatedColumn } });
  },
  moveTask: (activeId, overId) => {
    const { tasksByColumn } = get();
    const moveTaskData = getMoveTaskData(tasksByColumn, activeId, overId);
    if (!moveTaskData) return;

    const { activeColId, activeIndex, overColId, overIndex } = moveTaskData;
    if (activeColId === overColId && activeIndex === overIndex) return;

    const activeTaskObj = tasksByColumn[activeColId][activeIndex];
    const newState = { ...tasksByColumn };
    newState[activeColId] = tasksByColumn[activeColId].filter(
      (t) => t.id !== activeId
    );

    const targetCol = [...newState[overColId]];
    targetCol.splice(overIndex, 0, activeTaskObj);
    newState[overColId] = targetCol;

    set({ tasksByColumn: newState });
  },
  addTask: (title, columnId) => {
    const { tasksByColumn } = get();
    const lastTask =
      tasksByColumn[columnId]?.[tasksByColumn[columnId].length - 1];
    const newTask = {
      columnId,
      title,
      order: (lastTask?.order || 0) + 1,
      id: uuidv4(),
    };

    set({
      tasksByColumn: {
        ...tasksByColumn,
        [columnId]: [...(tasksByColumn[columnId] || []), newTask],
      },
    });
  },
});
