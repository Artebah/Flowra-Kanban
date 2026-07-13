import { useModalDetailsData } from "@/store/kanban/selectors";
import type { LabelEditionData } from ".";
import Button from "../Button";
import LabelsListItem from "./LabelsListItem";
import { useLabelsList } from "@/hooks/api/labels/useLabelsList";
import React from "react";

interface LabelDropdownContentProps {
  setLabelEditionData: React.Dispatch<React.SetStateAction<LabelEditionData>>;
}

function LabelDropdownContent({
  setLabelEditionData,
}: LabelDropdownContentProps) {
  const { boardId } = useModalDetailsData();

  const { data: labels = [], isLoading: isLoadingLabelsList } =
    useLabelsList(boardId);

  const { data: assignedLabels = [], isLoading: isLoadingAssignedLabels } =
    useLabelsList(boardId);

  const onToggleAssignLabel = (labelId: string) => {
    const ids = assignedLabels.map((label) => label.id);
    const exists = ids.includes(labelId);

    return exists ? ids.filter((id) => id !== labelId) : [...ids, labelId];
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        {labels.map((label) => (
          <LabelsListItem
            isAssigned={assignedLabels.some((l) => l.id === label.id)}
            onAssign={onToggleAssignLabel}
            setLabelEditionData={setLabelEditionData}
            key={label.id}
            label={label}
          />
        ))}
        {labels.length === 0 && (
          <div className="py-5 text-center">
            <p>No labels for this task</p>
          </div>
        )}
        {(isLoadingLabelsList || isLoadingAssignedLabels) && (
          <div className="py-5 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
          </div>
        )}
      </div>

      <Button
        onClick={() => setLabelEditionData({ mode: "create" })}
        className="mt-4 w-full"
        variant="outline"
      >
        Create a new label
      </Button>
    </div>
  );
}

export default LabelDropdownContent;
