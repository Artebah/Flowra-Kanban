import type { LabelEditionData } from ".";
import Button from "../Button";
import LabelsListItem from "./LabelsListItem";
import { useLabelsList } from "@/hooks/api/labels/useLabelsList";

interface LabelDropdownContentProps {
  boardId: string;
  setLabelEditionData: React.Dispatch<React.SetStateAction<LabelEditionData>>;
}

function LabelDropdownContent({
  boardId,
  setLabelEditionData,
}: LabelDropdownContentProps) {
  const { data: labels = [] } = useLabelsList(boardId);

  return (
    <div>
      <div className="flex flex-col gap-1">
        {labels.map((label) => (
          <LabelsListItem
            setLabelEditionData={setLabelEditionData}
            key={label.id}
            label={label}
          />
        ))}
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
