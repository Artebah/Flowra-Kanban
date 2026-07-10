import { Edit } from "lucide-react";
import Button from "../Button";
import { Checkbox } from "../ui/checkbox";
import type { ILabel } from "../../types/api/labels";

interface LabelsListItemProps {
  label: ILabel;
}

function LabelsListItem({ label }: LabelsListItemProps) {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex grow items-center gap-2 group">
        <Checkbox
          id={label.id}
          className="cursor-pointer group-hover:brightness-110"
        />
        <label
          htmlFor={label.id}
          className="cursor-pointer group-hover:brightness-110 grow bg-emerald-700 rounded-xs px-4 h-7 flex items-center"
        >
          <span className="text-sm">label 1</span>
        </label>
      </div>
      <Button className="p-2 size-8">
        <Edit className="size-4!" />
      </Button>
    </div>
  );
}

export default LabelsListItem;
