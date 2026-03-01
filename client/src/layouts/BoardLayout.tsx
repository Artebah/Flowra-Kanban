import Column from "../components/Column/index.tsx";
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  MouseSensor,
} from "@dnd-kit/core";
import React from "react";
import { useTasksByColumn } from "../store/kanban/selectors.ts";
import { useFetchTasks } from "../hooks/useFetchTasks.ts";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import Task from "../components/Task/index.tsx";
import type { ITask } from "../types/ITask.ts";
import type { BoardColumn } from "../types/api/columns.ts";
import AddColumnForm from "../components/AddColumnForm/index.tsx";
import TaskDetailsModal from "../components/TaskDetailsModal/index.tsx";
import { useDragHandlers } from "../hooks/useDragHandlers.ts";
import { useColumns } from "../store/kanban/selectors.ts";

interface BoardLayoutProps {
  boardId: string;
}

function BoardLayout({ boardId }: BoardLayoutProps) {
  const columns = useColumns();
  const tasksByColumn = useTasksByColumn();
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
    BoardColumn | undefined
  >(undefined);

  const { handleDragEnd, handleDragStart, handleDragOver } = useDragHandlers({
    boardId,
    columns,
    tasksByColumn,
    setDraggingTask,
    setDraggingColumn,
  });

  return (
    <div className="grow flex">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      >
        <div className="flex gap-2 items-start overflow-x-auto px-7 grow pb-4">
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

          <AddColumnForm boardId={boardId} />

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
        <TaskDetailsModal />
      </DndContext>
    </div>
  );
}

export default BoardLayout;
