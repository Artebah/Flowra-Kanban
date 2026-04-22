import type { ITask } from "../types/api/tasks";
import type { ITasksByColumn } from "../types/ITasksByColumn";
import {
  END_DROPPABLE_PREFIX,
  SORTABLE_COLUMN_PREFIX,
  getColumnIdFromDroppableId,
} from "../constants/dndPrefixes";
import { getItemIndexFromArray } from "./getItemIndexFromArray";

type GetReorderTaskDataReturn = {
  newOrder: number;
  columnId: string;
  task: ITask;
};

export function getReorderTaskData(
  tasksByColumn: ITasksByColumn,
  activeId: string,
  overId: string // taskID or columnId (with prefix) if move to empty column
): GetReorderTaskDataReturn | undefined {
  const getOrderByIndex = (tasks: ITask[], index: number) => {
    const prevNeighborOrder = tasks[index - 1]?.order;
    const nextNeighborOrder = tasks[index + 1]?.order;

    let newOrder: number;

    if (prevNeighborOrder === undefined && nextNeighborOrder === undefined) {
      newOrder = 1;
    } else if (prevNeighborOrder === undefined) {
      newOrder = nextNeighborOrder - 1;
    } else if (nextNeighborOrder === undefined) {
      newOrder = prevNeighborOrder + 1;
    } else {
      newOrder = Number(
        ((prevNeighborOrder + nextNeighborOrder) / 2).toFixed(15)
      );
    }

    if (newOrder === prevNeighborOrder || newOrder === nextNeighborOrder) {
      console.error("Precision limit reached! Rebalancing needed.");
      return;
    }

    return newOrder;
  };

  const targetColumnId = getColumnIdFromDroppableId(overId);

  if (targetColumnId) {
    const targetTasks = tasksByColumn[targetColumnId] || [];
    const activeIndexInTarget = getItemIndexFromArray(targetTasks, activeId);

    // Primary path: active task already moved by handleDragOver and we just compute its final order.
    if (activeIndexInTarget !== -1) {
      const task = targetTasks[activeIndexInTarget];
      if (!task) return;

      const newOrder = getOrderByIndex(targetTasks, activeIndexInTarget);
      if (newOrder === undefined) return;

      return { newOrder, columnId: targetColumnId, task };
    }

    // Fallback path for cases when dragOver did not move task before dragEnd.
    for (const [, colTasks] of Object.entries(tasksByColumn)) {
      const sourceIndex = getItemIndexFromArray(colTasks, activeId);
      if (sourceIndex !== -1) {
        const task = colTasks[sourceIndex];
        if (!task) return;

        if (!targetTasks.length) {
          return { newOrder: 1000, columnId: targetColumnId, task };
        }

        if (
          overId.startsWith(END_DROPPABLE_PREFIX) ||
          overId.startsWith(SORTABLE_COLUMN_PREFIX)
        ) {
          return {
            newOrder: targetTasks[targetTasks.length - 1].order + 1,
            columnId: targetColumnId,
            task,
          };
        }

        return {
          newOrder: targetTasks[0].order - 1,
          columnId: targetColumnId,
          task,
        };
      }
    }
  }

  // overId is a task id (including active task id after handleDragOver update).
  for (const [columnId, colTasks] of Object.entries(tasksByColumn)) {
    const currentTaskIndex = getItemIndexFromArray(colTasks, activeId);
    if (currentTaskIndex !== -1) {
      const task = colTasks[currentTaskIndex];
      if (!task) return;

      const newOrder = getOrderByIndex(colTasks, currentTaskIndex);
      if (newOrder === undefined) return;

      return { newOrder, columnId, task };
    }
  }
}
