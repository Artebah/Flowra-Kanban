import type { StateCreator } from "zustand";
import type { IColumnSlice, IKanbanStore } from "../types";

export const createColumnSlice: StateCreator<
  IKanbanStore,
  [],
  [],
  IColumnSlice
> = (set) => ({
  columns: [],
  setColumns: (columns) => set({ columns }),
  addNewColumn: (column) => {
    set((state) => ({
      columns: [...state.columns, column],
      tasksByColumn: { ...state.tasksByColumn, [column.id]: [] },
    }));
  },
  removeColumn: (columnId) => {
    set((state) => {
      const updatedTasksByColumn = { ...state.tasksByColumn };
      delete updatedTasksByColumn[columnId];
      return {
        columns: state.columns.filter((col) => col.id !== columnId),
        tasks: state.tasks.filter((task) => task.columnId !== columnId),
        tasksByColumn: updatedTasksByColumn,
      };
    });
  },
  updateColumn: (columnId, data) => {
    set((state) => ({
      columns: state.columns.map((col) =>
        col.id === columnId ? { ...col, ...data } : col
      ),
    }));
  },
});
