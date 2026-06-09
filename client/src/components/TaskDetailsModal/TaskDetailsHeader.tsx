import React from "react";
import CompleteCircleCheckbox from "../CompleteCircleCheckbox";
import EditableText from "../EditableText";

interface TaskDetailsHeaderProps {
  title: string;
}

function TaskDetailsHeader({ title }: TaskDetailsHeaderProps) {
  const [isEditableTitle, setIsEditableTitle] = React.useState(false);

  const handleToggleCompleted = () => {};

  const handleSaveTitle = () => {};

  return (
    <div className="mt-6 px-6">
      <div className="flex items-center gap-4">
        <CompleteCircleCheckbox
          isCompleted={true}
          onToggle={handleToggleCompleted}
        />
        <h3 className="w-full font-bold text-3xl">
          <EditableText
            isEditable={isEditableTitle}
            setIsEditable={setIsEditableTitle}
            onSave={handleSaveTitle}
            text={title}
          />
        </h3>
      </div>
    </div>
  );
}

export default TaskDetailsHeader;
