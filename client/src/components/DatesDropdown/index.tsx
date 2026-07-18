import { Popover } from "@base-ui/react";
import React from "react";
import Button from "../Button";
import { XIcon } from "lucide-react";

interface DatesDropdownProps {
  TriggerComponent: React.ReactElement;
}

function DatesDropdown({ TriggerComponent }: DatesDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger render={TriggerComponent} />
      <Popover.Portal>
        <Popover.Positioner
          side="bottom"
          align="start"
          sideOffset={4}
          className="z-50"
        >
          <Popover.Popup className="min-w-[300px] px-2 py-3 bg-dropdown-bg shadow-2xl shadow-dropdown-shadow rounded-md">
            <div className="border-b border-gray-500 mb-3 pb-2 flex items-center justify-between">
              <div />
              <p>Dates</p>
              <Button className="size-7 rounded-full" isIconOnly>
                <XIcon />
              </Button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default DatesDropdown;
