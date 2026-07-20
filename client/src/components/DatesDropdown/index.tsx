import Popover from "../Popover";
import { Calendar } from "../ui/calendar";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import Input from "../Input";
import { format, isValid, parse } from "date-fns";
import Button from "../Button";

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

  const setSpecificDateAndTime = React.useCallback((date: Date) => {
    setMonth(date);
    setDate(date);
    setInputDueDate(format(date, DATE_FORMAT));
    setInputDueTime(format(date, TIME_FORMAT));
  }, []);

  React.useEffect(() => {
    setSpecificDateAndTime(new Date());
  }, [setSpecificDateAndTime]);

  const handleCheckboxChange = (checked: boolean) => {
    setIsDueDate(checked);

    if (!checked) {
      setInputDueDate("");
      setInputDueTime("");
    } else {
      setSpecificDateAndTime(date || new Date());
    }
  };

  const onCalendarSelect = (newDate: Date | undefined) => {
    setDate(newDate);

    if (newDate && isDueDate) {
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

  const onClickRemove = () => {
    setIsOpen(false);

    // call api to clean up data
  };

  const onClickSubmit = () => {
    if (date) {
      const combinedStr = `${inputDueDate} ${inputDueTime}`;

      const finalDate = parse(
        combinedStr,
        `${DATE_FORMAT} ${TIME_FORMAT}`,
        new Date()
      );
      const dateTimeStringToSend = finalDate.toISOString();

      console.log(dateTimeStringToSend);
      // call api to save data
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
          <Checkbox
            checked={isDueDate}
            onCheckedChange={handleCheckboxChange}
          />
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

      <div className="mt-3">
        <Button
          onClick={onClickSubmit}
          type="button"
          className="w-full mb-2"
          variant="primary"
        >
          Save
        </Button>
        <Button
          onClick={onClickRemove}
          type="button"
          className="w-full"
          variant="outline"
        >
          Remove
        </Button>
      </div>
    </Popover>
  );
}

export default DatesDropdown;
