import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import classNames from "classnames";

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a Dropdown");
  }
  return context;
};

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

function Dropdown({ children, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={dropdownRef} className={classNames("relative", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

interface DropdownTargetProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

function DropdownTarget({
  children,
  className,
  asChild = false,
}: DropdownTargetProps) {
  const { toggle } = useDropdown();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        toggle();
        (children as React.ReactElement<any>).props.onClick?.(e);
      },
      className: classNames(
        (children as React.ReactElement<any>).props.className,
        className
      ),
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={classNames("outline-none", className)}
    >
      {children}
    </button>
  );
}

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right";
}

function DropdownMenu({
  children,
  className,
  align = "left",
}: DropdownMenuProps) {
  const { isOpen } = useDropdown();

  if (!isOpen) return null;

  return (
    <div
      className={classNames(
        "absolute top-full mt-1 z-50 min-w-[150px]",
        "bg-gray-night border border-gray-500 rounded-md shadow-lg",
        "py-1",
        {
          "left-0": align === "left",
          "right-0": align === "right",
        },
        className
      )}
    >
      {children}
    </div>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  destructive?: boolean;
}

function DropdownMenuItem({
  children,
  onClick,
  className,
  destructive = false,
}: DropdownMenuItemProps) {
  const { close } = useDropdown();

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={classNames(
        "w-full text-left px-3 py-2 text-sm cursor-pointer",
        "hover:bg-white/5 focus:bg-white/10 focus:outline-none",
        "transition-colors duration-150",
        {
          "text-gray-300 hover:text-white": !destructive,
          "text-red-400 hover:text-red-300 hover:bg-red-900/20": destructive,
        },
        className
      )}
    >
      {children}
    </button>
  );
}

// Compound component pattern
Dropdown.Target = DropdownTarget;
Dropdown.Menu = DropdownMenu;
Dropdown.MenuItem = DropdownMenuItem;

export default Dropdown;
