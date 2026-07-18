import React from "react";
import {
  Popover as ShadCnPopover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { ChevronLeft, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PopoverProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRender?: React.ReactElement;
  children: React.ReactNode;

  title?: string;
  showCloseButton?: boolean;
  onGoBack?: () => void;
}

function Popover({
  isOpen,
  setIsOpen,
  triggerRender,
  children,
  onGoBack,
  showCloseButton = true,
  title,
}: PopoverProps) {
  const [isLocalOpen, setIsLocalOpen] = React.useState(false);

  const defaultRender = <></>;
  const open = isOpen !== undefined ? isOpen : isLocalOpen;
  const setOpen = setIsOpen !== undefined ? setIsOpen : setIsLocalOpen;
  const render = triggerRender !== undefined ? triggerRender : defaultRender;
  const showHeader = onGoBack || title || showCloseButton;

  return (
    <ShadCnPopover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={render} />
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={4}
        className={cn(
          "z-50 min-w-[300px] px-2 bg-dropdown-bg shadow-2xl shadow-dropdown-shadow rounded-md",
          showHeader ? "pb-3 pt-0" : "py-3"
        )}
      >
        {showHeader && (
          <div className="relative min-h-10 border-b border-gray-600 mb-3 flex items-center">
            {onGoBack && (
              <Button className={"size-8 p-0"} onClick={onGoBack}>
                <ChevronLeft />
              </Button>
            )}
            <div className="absolute top-1/2 left-1/2 -translate-1/2">
              {title && (
                <p className="text-sm font-semibold text-gray-300">{title}</p>
              )}
            </div>

            {showCloseButton && (
              <Button
                className="absolute right-0 top-1/2 -translate-y-1/2 size-7 rounded-full"
                onClick={() => setOpen(false)}
              >
                <XIcon />
              </Button>
            )}
            <span />
          </div>
        )}

        {children}
      </PopoverContent>
    </ShadCnPopover>
  );
}

export default Popover;
