import type { ITask } from "../types/ITask";
import type { ITasksByColumn } from "../types/ITasksByColumn";

export function getTasksByColumn(tasks: ITask[]) {
  const grouped = tasks.reduce((acc, task) => {
    if (!acc[task.columnId]) acc[task.columnId] = [];
    acc[task.columnId].push(task);

    return acc;
  }, {} as ITasksByColumn);

  Object.values(grouped).forEach((tasksArray) =>
    tasksArray.sort((a, b) => a.order - b.order)
  );

  return grouped;
}
