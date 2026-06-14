import React from "react";
import CompleteCircleCheckbox from "../CompleteCircleCheckbox";
import EditableText from "../EditableText";
import { useUpdateTask } from "../../hooks/api/tasks/useUpdateTask";
import type { ITaskDetails } from "../../types/api/tasks";

interface TaskDetailsHeaderProps {
  taskDetails: ITaskDetails;
  boardId: string;
  taskId: string;
}

function TaskDetailsHeader({
  taskDetails,
  boardId,
  taskId,
}: TaskDetailsHeaderProps) {
  const [isEditableTitle, setIsEditableTitle] = React.useState(false);

  const updateTask = useUpdateTask();

  const handleToggleCompleted = () => {
    updateTask.mutate({
      boardId,
      taskId,
      updateTaskDto: { isCompleted: !taskDetails.isCompleted },
    });
  };

  const handleSaveTitle = (value: string) => {
    const val = value.trim();

    if (val) {
      updateTask.mutate({ boardId, taskId, updateTaskDto: { title: val } });
    }
  };

  return (
    <div className="mt-6 px-6">
      <div className="flex items-center gap-4">
        <CompleteCircleCheckbox
          isCompleted={taskDetails.isCompleted}
          disabled={updateTask.isPending}
          onToggle={handleToggleCompleted}
        />
        <h3 className="w-full font-bold text-3xl">
          <EditableText
            disabled={updateTask.isPending}
            isEditable={isEditableTitle}
            setIsEditable={setIsEditableTitle}
            onSave={handleSaveTitle}
            text={taskDetails.title}
          />
        </h3>
      </div>
    </div>
  );
}

export default TaskDetailsHeader;
