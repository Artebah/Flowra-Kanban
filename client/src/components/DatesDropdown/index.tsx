import Button from "../Button";
import { ClockIcon } from "lucide-react";
import Popover from "../Popover";
import { Calendar } from "../ui/calendar";
import React from "react";

function DatesDropdown() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Popover
      contentClassName="min-w-0 max-w-[250px]"
      triggerRender={
        <Button
          leadingIcon={<ClockIcon className="size-4" />}
          variant="outline"
          className="h-8 px-2"
        >
          Dates
        </Button>
      }
      title="Dates"
    >
      <div className="flex justify-center">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </div>
    </Popover>
  );
}

export default DatesDropdown;
