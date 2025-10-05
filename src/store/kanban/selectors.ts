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
