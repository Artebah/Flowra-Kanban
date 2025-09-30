import type { ITask } from "../../types/ITask";
import Button from "../Button";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";

interface TaskProps {
  task: ITask;
  isDragOverlayTask?: boolean;
}

function Task({ task, isDragOverlayTask }: TaskProps) {
  const {
    transition,
    isDragging,
    listeners,
    attributes,
    setNodeRef,
    transform,
  } = useSortable({ id: task.id, data: { columnId: task.columnId } });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    zIndex: isDragOverlayTask ? 10 : 1,
    background: isDragOverlayTask ? "#252525" : undefined,
  };

  return (
    <Button
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      fullWidth
      className="justify-start bg-gray-rich hover:bg-white/5 font-medium"
      style={style}>
      {task.title}
    </Button>
  );
}

export default Task;
