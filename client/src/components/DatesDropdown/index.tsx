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
      123
    </Popover>
    //<Popover.Root open={isOpen} onOpenChange={setIsOpen}>
    //  <Popover.Trigger render={TriggerComponent} />
    //  <Popover.Portal>
    //    <Popover.Positioner
    //      side="bottom"
    //      align="start"
    //      sideOffset={4}
    //      className="z-50"
    //    >
    //      <Popover.Popup className="min-w-[300px] px-2 py-3 bg-dropdown-bg shadow-2xl shadow-dropdown-shadow rounded-md">
    //        <div className="border-b border-gray-500 mb-3 pb-2 flex items-center justify-between">
    //          <div />
    //          <p>Dates</p>
    //          <Button className="size-7 rounded-full" isIconOnly>
    //            <XIcon />
    //          </Button>
    //        </div>
    //      </Popover.Popup>
    //    </Popover.Positioner>
    //  </Popover.Portal>
    //</Popover.Root>
  );
}

export default DatesDropdown;
