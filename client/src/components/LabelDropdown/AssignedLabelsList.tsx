import type { ILabel } from "@/types/api/labels";
import Button from "../Button";
import { Plus } from "lucide-react";
import LabelDropdown from ".";

interface AssignedLabelsListProps {
  labels: ILabel[];
}

function AssignedLabelsList({ labels }: AssignedLabelsListProps) {
  return (
    <div className="px-6 my-8">
      <p className="font-bold mb-2 text-gray-300">Labels</p>

      <div className="flex gap-1">
        {labels.map((label) => (
          <div
            key={label.id}
            className="px-3 min-w-14 h-10 rounded-md flex justify-center items-center"
            style={{ backgroundColor: label.color }}
          >
            {label.title}
          </div>
        ))}

        <LabelDropdown
          TriggerComponent={
            <Button variant="outline" className="bg-dropdown-bg" isIconOnly>
              <Plus />
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default AssignedLabelsList;
