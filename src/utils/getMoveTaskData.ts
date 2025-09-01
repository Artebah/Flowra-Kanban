import type { ITasksByColumn } from "../types/ITasksByColumn";
import { getItemIndexFromArray } from "./getItemIndexFromArray";

export function getMoveTaskData(
  tasksByColumn: ITasksByColumn,
  activeId: string,
  overId: string
) {
  // найти колонку/индекс active и over в prev
  let activeColId: string | null = null;
  let activeIndex = -1;
  let overColId: string | null = null;
  let overIndex = -1;

  for (const [colId, colTasks] of Object.entries(tasksByColumn)) {
    const ai = getItemIndexFromArray(colTasks, activeId);
    if (ai !== -1) {
      activeColId = colId;
      activeIndex = ai;
    }

    const oi = getItemIndexFromArray(colTasks, overId);
    if (oi !== -1) {
      overColId = colId;
      overIndex = oi;
    }
    if (activeColId && overColId) {
      return { activeColId, overColId, activeIndex, overIndex };
    }
  }
}
