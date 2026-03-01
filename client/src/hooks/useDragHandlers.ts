import { useCallback, useMemo } from "react";
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import type { ITask } from "../types/ITask.ts";
import type { BoardColumn } from "../types/api/columns.ts";
import type { ITasksByColumn } from "../types/ITasksByColumn.ts";
import { debounce } from "../utils/debounce.ts";
import { useMoveTask } from "../store/kanban/selectors.ts";
import { useUpdateTaskOrder } from "../store/kanban/selectors.ts";
import { arrayMove } from "@dnd-kit/sortable";
import { useReorderColumns } from "./api/columns/useReorderColumns.ts";

interface UseDragHandlersParams {
  boardId: string;
  columns: BoardColumn[];
  tasksByColumn: ITasksByColumn;
  setDraggingTask: (task: ITask | undefined) => void;
  setDraggingColumn: (column: BoardColumn | undefined) => void;
}

export function useDragHandlers({
  boardId,
  columns,
  tasksByColumn,
  setDraggingTask,
  setDraggingColumn,
}: UseDragHandlersParams) {
  const updateTaskOrder = useUpdateTaskOrder();
  const moveTask = useMoveTask();
  const reorderColumns = useReorderColumns();

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      setDraggingColumn(undefined);
      setDraggingTask(undefined);

      const { active, over } = e;

      if (!over) return;

      const activeId = active.id as string;
      const overId = over.id as string;

      // If dragging a column
      if (
        activeId.startsWith("sortable-column-") &&
        overId.startsWith("sortable-column-")
      ) {
        const oldIndex = columns.findIndex(
          (col) => `sortable-column-${col.id}` === activeId
        );
        const newIndex = columns.findIndex(
          (col) => `sortable-column-${col.id}` === overId
        );
        if (oldIndex === -1 || newIndex === -1) return;

        const updated = arrayMove(columns, oldIndex, newIndex);
        const columnsWithUpdatedOrder = updated.map((item, index) => ({
          ...item,
          order: index,
        }));

        reorderColumns.mutate({
          boardId,
          columnsWithUpdatedOrder,
        });
        return;
      }

      // Otherwise, handle task drag
      updateTaskOrder(overId);
    },
    [
      setDraggingColumn,
      setDraggingTask,
      updateTaskOrder,
      columns,
      boardId,
      reorderColumns,
    ]
  );

  const handleDragStart = useCallback(
    (e: DragStartEvent) => {
      const isColumn = e.active.data.current?.isColumn as boolean | undefined;

      // Dragging a column
      if (isColumn) {
        const colId = e.active.data.current?.columnId;

        if (colId) {
          const found = columns.find((col) => col.id === colId);

          if (found) {
            setDraggingColumn(found);
            setDraggingTask(undefined);
          }
          return;
        }
      }

      // Dragging a task
      const draggingTaskId = e.active.id;

      let foundTask = null;
      let actualColumnId = null;

      for (const [colId, tasks] of Object.entries(tasksByColumn)) {
        const task = tasks.find((t) => t.id === draggingTaskId);
        if (task) {
          foundTask = task;
          actualColumnId = colId;
          break;
        }
      }

      if (foundTask && actualColumnId) {
        setDraggingTask(foundTask);
        setDraggingColumn(undefined);
      } else {
        console.log("❌ Task not found in any column:", draggingTaskId);
      }
    },
    [columns, tasksByColumn, setDraggingColumn, setDraggingTask]
  );

  const dragOverHandler = useCallback(
    (e: DragOverEvent) => {
      const { active, over } = e;
      const activeId = active.id as string;
      const overId = over?.id as string | undefined;

      if (!overId || activeId === overId) return;

      moveTask(activeId, overId);
    },
    [moveTask]
  );

  const handleDragOver = useMemo(
    () => debounce(dragOverHandler, 50),
    [dragOverHandler]
  );

  return {
    handleDragEnd,
    handleDragStart,
    handleDragOver,
  };
}
