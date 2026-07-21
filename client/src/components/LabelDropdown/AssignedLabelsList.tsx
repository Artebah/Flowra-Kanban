import type { ILabel } from "@/types/api/labels";
import Button from "../Button";
import { Plus } from "lucide-react";
import LabelDropdown from ".";

interface AssignedLabelsListProps {
  labels: ILabel[];
}

function AssignedLabelsList({ labels }: AssignedLabelsListProps) {
  return (
    <div>
      <p className="font-medium text-xs mb-2 text-gray-300">Labels</p>

      <div className="flex gap-1 flex-wrap">
        {labels.map((label) => (
          <div
            key={label.id}
            className="px-3 min-w-12 text-sm h-8 rounded-md flex justify-center items-center"
            style={{ backgroundColor: label.color }}
          >
            {label.title}
          </div>
        ))}

        <LabelDropdown
          triggerRender={
            <Button variant="outline" className="size-8" isIconOnly>
              <Plus />
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default AssignedLabelsList;
