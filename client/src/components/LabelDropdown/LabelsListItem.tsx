import { Edit } from "lucide-react";
import Button from "../Button";
import { Checkbox } from "../ui/checkbox";
import type { ILabel } from "../../types/api/labels";
import type { LabelEditionData } from ".";
import { cn } from "@/lib/utils";

interface LabelsListItemProps {
  label: ILabel;
  setLabelEditionData: React.Dispatch<React.SetStateAction<LabelEditionData>>;
  isAssigned: boolean;
  onAssign: (labelId: string) => void;
  disabled: boolean;
}

function LabelsListItem({
  label,
  setLabelEditionData,
  isAssigned,
  onAssign,
  disabled,
}: LabelsListItemProps) {
  const onClickEdit = (labelToEdit: ILabel) => {
    setLabelEditionData({ initialData: labelToEdit, mode: "edit" });
  };

  return (
    <div className="flex gap-2 items-center">
      <div className={"flex grow items-center gap-2 group"}>
        <Checkbox
          disabled={disabled}
          checked={isAssigned}
          onCheckedChange={() => onAssign(label.id)}
          id={label.id}
          className={cn("cursor-pointer", {
            "cursor-pointer group-hover:brightness-110": !disabled,
            "cursor-not-allowed opacity-70": disabled,
          })}
        />
        <label
          htmlFor={label.id}
          style={{ backgroundColor: label.color }}
          className={cn(" grow rounded-xs px-4 h-7 flex items-center", {
            "cursor-pointer group-hover:brightness-110": !disabled,
            "cursor-not-allowed opacity-70": disabled,
          })}
        >
          <span className="text-sm">{label.title}</span>
        </label>
      </div>
      <Button onClick={() => onClickEdit(label)} className="p-2 size-8">
        <Edit className="size-4!" />
      </Button>
    </div>
  );
}

export default LabelsListItem;
