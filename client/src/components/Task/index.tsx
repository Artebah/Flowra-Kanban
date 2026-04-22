import type { ITask } from "../../types/api/tasks";
import Button from "../Button";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { useUpdateModalDetailsData } from "../../store/kanban/selectors";

interface TaskProps {
  task: ITask;
  boardId: string;
  isDragOverlayTask?: boolean;
}

function Task({ task, boardId, isDragOverlayTask }: TaskProps) {
  const {
    transition,
    isDragging,
    listeners,
    attributes,
    setNodeRef,
    transform,
  } = useSortable({ id: task.id, data: { columnId: task.columnId } });
  const updateModalDetailsData = useUpdateModalDetailsData();

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
      onClick={() =>
        updateModalDetailsData({ boardId, taskId: task.id, isOpen: true })
      }
      style={style}
    >
      {task.title}
    </Button>
  );
}

export default Task;
