import Button from "../Button";
import { ClockIcon } from "lucide-react";
import Popover from "../Popover";

function DatesDropdown() {
  return (
    <Popover
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
      content
    </Popover>
  );
}

export default DatesDropdown;
