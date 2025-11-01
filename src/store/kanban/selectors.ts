import { useKanbanStore } from "./useKanbanStore";

export const useTasks = () => useKanbanStore((s) => s.tasks);
export const useTasksByColumn = () => useKanbanStore((s) => s.tasksByColumn);
export const useSetTasks = () => useKanbanStore((s) => s.setTasks);
export const useUpdateTaskOrder = () =>
  useKanbanStore((s) => s.updateTaskOrder);
export const useMoveTask = () => useKanbanStore((s) => s.moveTask);
export const useAddTask = () => useKanbanStore((s) => s.addTask);
export const useColumns = () => useKanbanStore((s) => s.columns);
export const useSetColumns = () => useKanbanStore((s) => s.setColumns);
export const useUpdateColumnOrder = () =>
  useKanbanStore((s) => s.updateColumnOrder);
export const useAddNewColumn = () => useKanbanStore((s) => s.addNewColumn);
export const useRemoveColumn = () => useKanbanStore((s) => s.removeColumn);
export const useUpdateColumn = () => useKanbanStore((s) => s.updateColumn);
export const useModalDetailsData = () =>
  useKanbanStore((s) => s.modalDetailsData);
export const useUpdateModalDetailsData = () =>
  useKanbanStore((s) => s.updateModalDetailsData);
