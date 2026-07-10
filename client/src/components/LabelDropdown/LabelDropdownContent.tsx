import type { ILabel } from "@/types/api/labels";
import Button from "../Button";
import LabelsListItem from "./LabelsListItem";

interface LabelDropdownContentProps {
  setIsLabelCreation: React.Dispatch<React.SetStateAction<boolean>>;
}

function LabelDropdownContent({
  setIsLabelCreation,
}: LabelDropdownContentProps) {
  return (
    <div>
      <div>
        <p className="text-xs font-semibold">Labels</p>
        {([] as ILabel[]).map((label) => (
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
