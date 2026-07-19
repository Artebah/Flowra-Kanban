import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "../Button";

interface DropdownProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRender: React.ReactElement;
  children: React.ReactNode;

  title?: string;
  showCloseButton?: boolean;
}

function Dropdown({
  isOpen,
  setIsOpen,
  triggerRender,
  children,
  showCloseButton = true,
  title,
}: DropdownProps) {
  const [isLocalOpen, setIsLocalOpen] = React.useState(false);

  const open = isOpen !== undefined ? isOpen : isLocalOpen;
  const setOpen = setIsOpen !== undefined ? setIsOpen : setIsLocalOpen;
  const showHeader = title || showCloseButton;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger render={triggerRender} />
      <DropdownMenuContent
        side="bottom"
        align="start"
        sideOffset={4}
        className={cn(
          "z-50 min-w-[300px] px-2 bg-dropdown-bg text-white shadow-2xl shadow-dropdown-shadow rounded-md",
          showHeader ? "pb-3 pt-0" : "py-3"
        )}
      >
        {showHeader && (
          <div className="relative min-h-10 border-b border-gray-600 mb-3 flex items-center">
            <div className="absolute top-1/2 left-1/2 -translate-1/2">
              {title && (
                <p className="text-sm font-semibold text-gray-300">{title}</p>
              )}
            </div>

            {showCloseButton && (
              <Button
                className="absolute right-0 top-1/2 p-0 -translate-y-1/2 active:-translate-y-1/2! size-7"
                onClick={() => setOpen(false)}
              >
                <XIcon className="size-5" />
              </Button>
            )}
            <span />
          </div>
        )}

        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dropdown;
