import Button from "../Button";
import LabelsListItem from "./LabelsListItem";
import { useLabelsList } from "@/hooks/api/labels/useLabelsList";

interface LabelDropdownContentProps {
  boardId: string;
  setIsLabelCreation: React.Dispatch<React.SetStateAction<boolean>>;
}

function LabelDropdownContent({
  boardId,
  setIsLabelCreation,
}: LabelDropdownContentProps) {
  const { data: labels = [] } = useLabelsList(boardId);

  return (
    <div>
      <div>
        <p className="text-xs font-semibold">Labels</p>
        {labels.map((label) => (
          <LabelsListItem key={label.id} label={label} />
        ))}
      </div>

      <Button
        onClick={() => setIsLabelCreation(true)}
        className="mt-4 w-full"
        variant="outline"
      >
        Create a new label
      </Button>
    </div>
  );
}

export default LabelDropdownContent;
