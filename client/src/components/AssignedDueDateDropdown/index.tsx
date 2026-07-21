import { format, parseISO } from "date-fns";
import DatesDropdown from "../DatesDropdown";
import Button from "../Button";
import type { ITaskDetails } from "@/types/api/tasks";
import { ChevronDown } from "lucide-react";

interface AssignedDueDateDropdownProps {
  dueDateString: string;
  taskDetails: ITaskDetails;
}

function AssignedDueDateDropdown({
  dueDateString,
  taskDetails,
}: AssignedDueDateDropdownProps) {
  const date = parseISO(dueDateString);

  const formattedDate = format(date, "MMM d, HH:mm");

  return (
    <div>
      <p className="font-bold mb-2 text-gray-300">Due date</p>

      <DatesDropdown
        triggerRender={
          <Button variant="outline">
            {formattedDate} <ChevronDown className="size-5" />
          </Button>
        }
        taskDetails={taskDetails}
      />
    </div>
  );
}

export default AssignedDueDateDropdown;
