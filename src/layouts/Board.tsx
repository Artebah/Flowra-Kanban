import Column from "../components/Column";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  useSensors,
  useSensor,
  MouseSensor,
} from "@dnd-kit/core";
import React from "react";
import { useColumns, useUpdateColumnOrder } from "../store/kanban/selectors";
import { useFetchTasks } from "../hooks/useFetchTasks";
import { debounce } from "../utils/debounce";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  useMoveTask,
  useTasksByColumn,
  useUpdateTaskOrder,
} from "../store/kanban/selectors";
import Task from "../components/Task";
import type { ITask } from "../types/ITask.ts";
import type { IColumn } from "../types/IColumn.ts";

function Board() {
  const columns = useColumns();
  const updateColumnOrder = useUpdateColumnOrder();
  const tasksByColumn = useTasksByColumn();
  const updateTaskOrder = useUpdateTaskOrder();
  const moveTask = useMoveTask();
  useFetchTasks();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const [draggingTask, setDraggingTask] = React.useState<ITask | undefined>(
    undefined
  );
  const [draggingColumn, setDraggingColumn] = React.useState<
    IColumn | undefined
  >(undefined);

  const handleDragEnd = (e: DragEndEvent) => {
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
      updateColumnOrder(activeId, overId);
      return;
    }

    // Otherwise, handle task drag
    updateTaskOrder(overId);
  };

  const handleDragStart = (e: DragStartEvent) => {
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
  };

  const dragOverHandler = React.useCallback(
    (e: DragOverEvent) => {
      const { active, over } = e;
      const activeId = active.id as string;
      const overId = over?.id as string | undefined;

      if (!overId || activeId === overId) return;

      moveTask(activeId, overId);
    },
    [moveTask]
  );

  const handleDragOver = React.useMemo(
    () => debounce(dragOverHandler, 50),
    [dragOverHandler]
  );

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      <div className="flex gap-2 items-start">
        <SortableContext
          id="sortable-columns"
          items={columns.map((col) => `sortable-column-${col.id}`)}
          strategy={horizontalListSortingStrategy}
        >
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasksByColumn[column.id] || []}
            />
          ))}
        </SortableContext>

        <DragOverlay>
          {draggingColumn && (
            <Column
              column={draggingColumn}
              tasks={tasksByColumn[draggingColumn.id] || []}
              isDragOverlay
            />
          )}
          {draggingTask && <Task isDragOverlayTask task={draggingTask} />}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default Board;
