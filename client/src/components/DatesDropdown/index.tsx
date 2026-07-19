import Popover from "../Popover";
import { Calendar } from "../ui/calendar";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import Input from "../Input";

interface DatesDropdownProps {
  triggerRender: React.ReactElement;
}

function DatesDropdown({ triggerRender }: DatesDropdownProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const today = new Date();
  const todayTime = today.toISOString().split("T")[0];

  return (
    <Popover
      contentClassName="min-w-0 max-w-[250px]"
      triggerRender={triggerRender}
      title="Dates"
    >
      <div className="flex justify-center">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </div>
      <p className="text-sm mb-1.5">Due date</p>
      <div className="flex gap-3">
        <Checkbox checked={true} />
        <div className="flex gap-3">
          <Input className="h-9" />
          <Input className="h-9" type="time" defaultValue={todayTime} />
        </div>
      </div>
    </Popover>
  );
}

export default DatesDropdown;
