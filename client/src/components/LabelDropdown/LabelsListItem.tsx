import { Edit } from "lucide-react";
import Button from "../Button";
import { Checkbox } from "../ui/checkbox";

function LabelsListItem() {
  return (
    <div className="flex gap-3 items-center">
      <Checkbox />
      <div className="bg-emerald-700 rounded-xs px-4 h-7 flex items-center">
        <p className="text-sm">label 1</p>
      </div>
      <Button className="p-2 size-8">
        <Edit className="size-4!" />
      </Button>
    </div>
  );
}

export default LabelsListItem;
