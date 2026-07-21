import { format, isPast, isToday, isTomorrow, parseISO } from "date-fns";
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

  const isOverdue = isPast(date);
  const isDueSoon = !isOverdue ? isToday(date) || isTomorrow(date) : false;

  return (
    <div>
      <p className="font-medium text-xs mb-2 text-gray-300">Due date</p>

      <DatesDropdown
        triggerRender={
          <Button variant="outline" className="h-8 px-2 text-sm">
            <span className="leading-0">{formattedDate}</span>
            {isDueSoon && (
              <span className="flex items-center h-4 text-xs bg-amber-300 text-gray-dim px-1 rounded-xs font-normal">
                Due soon
              </span>
            )}
            {isOverdue && (
              <span className="flex items-center h-4 text-xs bg-red-400 text-gray-dim px-1 rounded-xs font-normal">
                Overdue
              </span>
            )}
            <ChevronDown className="size-5" />
          </Button>
        }
        taskDetails={taskDetails}
      />
    </div>
  );
}

export default AssignedDueDateDropdown;
