import Column from "../components/Column";
import { columns } from "../mock/columns";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import React from "react";
import type { ITask } from "../types/ITask";
import Task from "../components/Task";
import {
  useMoveTask,
  useTasksByColumn,
  useUpdateTaskOrder,
} from "../store/kanban/selectors";
import { useFetchTasks } from "../hooks/useFetchTasks";
import { debounce } from "../utils/debounce";

function Board() {
  const tasksByColumn = useTasksByColumn();
  const updateTaskOrder = useUpdateTaskOrder();
  const moveTask = useMoveTask();
  useFetchTasks();

  const [draggingTask, setDraggingTask] = React.useState<ITask | undefined>(
    undefined
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { over } = e;

    if (!over) return;

    const overId = over.id as string;

    updateTaskOrder(overId);
  };

  const handleDragStart = (e: DragStartEvent) => {
    const draggingTaskId = e.active.id;
    const draggingTaskColumnId = e.active.data.current?.columnId;

    if (draggingTaskColumnId) {
      const found = tasksByColumn[draggingTaskColumnId].find(
        (task) => task.id === draggingTaskId
      );

      setDraggingTask(found);
    }
  };

  const dragOverHandler = (e: DragOverEvent) => {
    const { active, over } = e;
    const activeId = active.id as string;
    const overId = over?.id as string | undefined;

    if (!overId || activeId === overId) return;

    moveTask(activeId, overId);
  };

  const handleDragOver = React.useMemo(() => debounce(dragOverHandler, 50), []);

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}>
      <div className="flex gap-2 items-start">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasksByColumn[column.id] || []}
          />
        ))}

        <DragOverlay>
          {draggingTask && <Task isDragOverlayTask task={draggingTask} />}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default Board;
