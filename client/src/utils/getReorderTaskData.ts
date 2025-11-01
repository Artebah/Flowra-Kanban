import type { ITasksByColumn } from "../types/ITasksByColumn";
import { getItemIndexFromArray } from "./getItemIndexFromArray";

export function getReorderTaskData(
  tasksByColumn: ITasksByColumn,
  overId: string
) {
  for (const [columnId, colTasks] of Object.entries(tasksByColumn)) {
    const currentTaskIndex = getItemIndexFromArray(colTasks, overId);
    if (currentTaskIndex !== -1) {
      const prevNeighborOrder = colTasks[currentTaskIndex - 1]?.order;
      const nextNeighborOrder = colTasks[currentTaskIndex + 1]?.order;

      let newOrder: number;

      if (!prevNeighborOrder) {
        newOrder = nextNeighborOrder - 1;
      } else if (!nextNeighborOrder) {
        newOrder = prevNeighborOrder + 1;
      } else {
        newOrder = Number(
          ((prevNeighborOrder + nextNeighborOrder) / 2).toFixed(6)
        );
      }

      const task = tasksByColumn[columnId][currentTaskIndex];

      return { newOrder: newOrder, columnId, task: task };
    }
  }
}
