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
  const [month, setMonth] = React.useState<Date>(new Date());

  const [isOpen, setIsOpen] = React.useState(false);

  const [inputDueDate, setInputDueDate] = React.useState<string>("");
  const [inputDueTime, setInputDueTime] = React.useState<string>("");
  const [isDueDate, setIsDueDate] = React.useState(true);

  const dateInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const today = new Date();

    setInputDueDate(format(today, DATE_FORMAT));
    setInputDueTime(format(today, TIME_FORMAT));
  }, []);

  React.useEffect(() => {
    if (!isDueDate) {
      setInputDueDate("");
      setInputDueTime("");
    }
  }, [isDueDate]);

  const onCalendarSelect = (newDate: Date | undefined) => {
    setDate(newDate);

    if (newDate) {
      setInputDueDate(format(newDate, DATE_FORMAT));
    }
  };

  const onMonthChange = (newMonthDate: Date) => {
    setMonth(newMonthDate);
  };

  const onBlurDateInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = e.target.value;

    const parsedDate = parse(value, DATE_FORMAT, new Date());

    if (isValid(parsedDate)) {
      setMonth(parsedDate);
      setDate(parsedDate);
    } else {
      if (date) {
        setInputDueDate(format(date, DATE_FORMAT));
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
        <Calendar
          month={month}
          selected={date}
          onMonthChange={onMonthChange}
          onSelect={onCalendarSelect}
          mode="single"
        />
      </div>
      <div>
        <p className="text-sm mb-1.5">Due date</p>
        <div className="flex gap-3 items-center">
          <Checkbox checked={isDueDate} onCheckedChange={setIsDueDate} />
          <div className="flex gap-3">
            <Input
              disabled={!isDueDate}
              onBlur={onBlurDateInput}
              ref={dateInputRef}
              className="h-9"
              placeholder="M/D/YYYY"
              onChange={(e) => setInputDueDate(e.target.value)}
              value={inputDueDate}
            />
            <Input
              disabled={!isDueDate}
              className="h-9"
              type="time"
              onChange={(e) => setInputDueTime(e.target.value)}
              value={inputDueTime}
            />
          </div>
        </div>
      </div>
    </Popover>
  );
}

export default DatesDropdown;
