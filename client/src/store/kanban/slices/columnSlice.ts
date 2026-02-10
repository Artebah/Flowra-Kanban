import type { StateCreator } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { columns as initialColumns } from "../../../mock/columns";
import type { IColumnSlice, IKanbanStore } from "../types";

export const createColumnSlice: StateCreator<
  IKanbanStore,
  [],
  [],
  IColumnSlice
> = (set, get) => ({
  columns: initialColumns,
  setColumns: (columns) => set({ columns }),
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
  addNewColumn: (title) => {
    const columns = get().columns;
    const newColOrder = Math.max(0, columns.length - 1);
    const newColData = { order: newColOrder, id: uuidv4(), title };

    set((state) => ({
      columns: [...state.columns, newColData],
      tasksByColumn: { ...state.tasksByColumn, [newColData.id]: [] },
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
