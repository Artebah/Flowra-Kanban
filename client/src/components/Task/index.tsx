import type { ITask } from "../../types/api/tasks";
import Button from "../Button";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { useUpdateModalDetailsData } from "../../store/kanban/selectors";
import { format, isPast, isToday, isTomorrow, parseISO } from "date-fns";
import { ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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

  //TODO: finish implementation
  const { assignedLabels, assignedMembers } = task;

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    zIndex: isDragOverlayTask ? 10 : 1,
    background: isDragOverlayTask ? "#252525" : undefined,
  };
  console.log(task.dueDate);

  const parsedDueDate = task.dueDate ? parseISO(task.dueDate) : null;
  const dueDateString = parsedDueDate ? format(parsedDueDate, "MMM d") : null;
  const isOverdue = parsedDueDate ? isPast(parsedDueDate) : false;
  const isDueSoon =
    parsedDueDate && !isOverdue
      ? isToday(parsedDueDate) || isTomorrow(parsedDueDate)
      : false;

  return (
    <Button
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      fullWidth
      className="items-start h-auto py-2 flex-col bg-gray-rich hover:bg-white/5 font-medium"
      onClick={() =>
        updateModalDetailsData({ boardId, taskId: task.id, isOpen: true })
      }
      style={style}
    >
      {assignedLabels.length > 0 && (
        <div className="w-full grid grid-cols-5 gap-1">
          {assignedLabels.map((label) => (
            <span
              className="h-2 rounded-md"
              key={label.id}
              style={{ backgroundColor: label.color }}
            />
          ))}
        </div>
      )}

      <span>{task.title}</span>

      <div className="flex justify-between w-full items-center gap-3 flex-wrap">
        {dueDateString && (
          <span
            className={cn(
              "flex items-center rounded-sm gap-1 px-1 h-5 text-xs text-gray-300",
              {
                "text-gray-dim! bg-amber-300": isDueSoon,
                "text-gray-dim! bg-red-400": isOverdue,
              }
            )}
          >
            <ClockIcon className="size-4" />
            {dueDateString}
          </span>
        )}

        {assignedMembers.length > 0 && (
          <div>
            {assignedMembers.map((member) => (
              <div className="size-5" key={member.id}>
                <img
                  title={`${member.email} (${member.username})`}
                  className="size-full rounded-full object-cover"
                  src="/avatar_1.jpg"
                  alt={member.username}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Button>
  );
}

export default Task;
