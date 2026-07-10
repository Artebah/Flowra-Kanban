import React from "react";
import Button from "../Button";
import { TagIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import CreateLabelDropdownContent from "./LabelForm";
import LabelDropdownContent from "./LabelDropdownContent";

interface LabelDropdownProps {
  boardId: string;
}

function LabelDropdown({ boardId }: LabelDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLabelCreation, setIsLabelCreation] = React.useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            leadingIcon={<TagIcon className="size-4" />}
            variant="outline"
            className="h-8 px-2"
          >
            Labels
          </Button>
        }
      />
      <DropdownMenuContent className="min-w-[300px] px-2 py-3 bg-dropdown-bg! shadow-2xl shadow-dropdown-shadow">
        <div className="pb-2">
          <p className="text-sm text-center font-semibold">
            {isLabelCreation ? "Create label" : "Labels"}
          </p>
        </div>

        {isLabelCreation ? (
          <CreateLabelDropdownContent mode="create" />
        ) : (
          <LabelDropdownContent
            boardId={boardId}
            setIsLabelCreation={setIsLabelCreation}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LabelDropdown;
