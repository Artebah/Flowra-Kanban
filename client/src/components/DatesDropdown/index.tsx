import Popover from "../Popover";
import { Calendar } from "../ui/calendar";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import Input from "../Input";
import { format, isValid, parse } from "date-fns";

interface DatesDropdownProps {
  triggerRender: React.ReactElement;
}

const DATE_FORMAT = "MM/dd/yyyy";
const TIME_FORMAT = "HH:mm";

function DatesDropdown({ triggerRender }: DatesDropdownProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = React.useState(false);
  const dateInputRef = React.useRef<HTMLInputElement>(null);
  const [inputDate, setInputDate] = React.useState<string>();
  const [inputTime, setInputTime] = React.useState<string>();

  React.useEffect(() => {
    const today = new Date();

    setInputDate(format(today, DATE_FORMAT));
    setInputTime(format(today, TIME_FORMAT));
  }, []);

  const onCalendarSelect = (newDate: Date | undefined) => {
    setDate(newDate);

    if (newDate) {
      setInputDate(format(newDate, DATE_FORMAT));
    }
  };

  const onBlurDateInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = e.target.value;

    const parsedDate = parse(value, DATE_FORMAT, new Date());

    if (isValid(parsedDate)) {
      setDate(parsedDate);
    } else {
      if (date) {
        setInputDate(format(date, DATE_FORMAT));
      }
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      contentClassName="min-w-0 max-w-[250px]"
      triggerRender={triggerRender}
      title="Dates"
    >
      <div className="flex justify-center">
        <Calendar mode="single" selected={date} onSelect={onCalendarSelect} />
      </div>
      <div>
        <p className="text-sm mb-1.5">Due date</p>
        <div className="flex gap-3 items-center">
          <Checkbox checked={true} />
          <div className="flex gap-3">
            <Input
              onBlur={onBlurDateInput}
              ref={dateInputRef}
              className="h-9"
              onChange={(e) => setInputDate(e.target.value)}
              value={inputDate}
            />
            <Input
              className="h-9"
              type="time"
              onChange={(e) => setInputTime(e.target.value)}
              value={inputTime}
            />
          </div>
        </div>
      </div>
    </Popover>
  );
}

export default DatesDropdown;
