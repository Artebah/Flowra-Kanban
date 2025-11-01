import type { IColumn } from "../../types/IColumn";
import type { ITask } from "../../types/ITask";
import Task from "../Task";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddTaskForm from "../AddTaskForm";
import EmptyColumn from "./EmptyColumn";
import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import ColumnActionsDropdown from "../ColumnActionsDropdown";
import EditableText from "../EditableText";

interface ColumnProps {
  column: IColumn;
  tasks: ITask[];
  isDragOverlay?: boolean;
}

function Column({ column, tasks, isDragOverlay = false }: ColumnProps) {
  const [isAddCardOpen, setIsAddCardOpen] = React.useState(false);
  const [isEditableTitle, setIsEditableTitle] = React.useState(false);
  const { setNodeRef: setEndDropNodeRef } = useDroppable({
    id: `end-droppable-${column.id}`,
    data: { columnId: column.id, isColumn: true },
  });
  const {
    transition,
    listeners,
    attributes,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({
    id: `sortable-column-${column.id}`,
    data: { columnId: column.id, isColumn: true },
  });

  const [allowDraggingColumn, setAllowDraggingColumn] = React.useState(true);

  React.useEffect(() => {
    setAllowDraggingColumn(!isEditableTitle && !isAddCardOpen);
  }, [setAllowDraggingColumn, isEditableTitle, isAddCardOpen]);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: 10,
    opacity: isDragging && !isDragOverlay ? 0 : 1,
  };

  return (
    <div
      {...(!isDragOverlay && allowDraggingColumn ? listeners : {})}
      {...(!isDragOverlay && allowDraggingColumn ? attributes : {})}
      ref={setNodeRef}
      className="bg-gray-charcoal py-3 px-3 rounded-xl max-w-[300px] w-full flex flex-col"
      style={{ ...style, backgroundColor: column.color }}
    >
      <div className="flex items-center mb-2">
        <div className="font-semibold h-10 pl-2 flex items-center grow text-white cursor-pointer">
          <EditableText
            initialText={column.title}
            isEditable={isEditableTitle}
            setIsEditable={setIsEditableTitle}
          />
        </div>
        <ColumnActionsDropdown
          column={column}
          setAllowDraggingColumn={setAllowDraggingColumn}
          setIsAddCardOpen={setIsAddCardOpen}
        />
      </div>
      <div className="flex flex-col gap-1 min-h-28">
        <SortableContext
          id={"sortable-column-" + column.id}
          items={tasks}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 && <EmptyColumn columnId={column.id} />}
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </SortableContext>
        {/* Droppable area at the end of the column for dropping at last position */}
        {tasks.length > 0 && (
          <div
            ref={setEndDropNodeRef}
            className="h-2 grow w-full bg-transparent"
            aria-hidden="true"
          />
        )}
      </div>

      <AddTaskForm
        isAddCardOpen={isAddCardOpen}
        setIsAddCardOpen={setIsAddCardOpen}
        columnId={column.id}
      />
    </div>
  );
}

export default Column;
