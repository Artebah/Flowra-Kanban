import Column from "../components/Column/index.tsx";
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  MouseSensor,
} from "@dnd-kit/core";
import React from "react";
import { useUpdateColumnOrder } from "../store/kanban/selectors.ts";
import { useFetchTasks } from "../hooks/useFetchTasks.ts";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  useMoveTask,
  useTasksByColumn,
  useUpdateTaskOrder,
} from "../store/kanban/selectors.ts";
import Task from "../components/Task/index.tsx";
import type { ITask } from "../types/ITask.ts";
import type { IColumn } from "../types/IColumn.ts";
import AddColumnForm from "../components/AddColumnForm/index.tsx";
import TaskDetailsModal from "../components/TaskDetailsModal/index.tsx";
import { useDragHandlers } from "../hooks/useDragHandlers.ts";
import { useBoardColumnsList } from "../hooks/api/useBoardColumnsList";

interface BoardLayoutProps {
  boardId: string;
}

function BoardLayout({ boardId }: BoardLayoutProps) {
  const { data: columns = [], isLoading: isLoadingColumns } =
    useBoardColumnsList(boardId);
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

  const { handleDragEnd, handleDragStart, handleDragOver } = useDragHandlers({
    columns,
    tasksByColumn,
    setDraggingTask,
    setDraggingColumn,
    updateColumnOrder,
    updateTaskOrder,
    moveTask,
  });

  if (isLoadingColumns) {
    return <>loading columns...</>;
  }

  return (
    <div>
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

          <AddColumnForm />

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
