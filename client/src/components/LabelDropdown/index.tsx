import React from "react";
import Button from "../Button";
import { ChevronLeft, TagIcon } from "lucide-react";
import { Popover } from "@base-ui/react/popover";
import LabelForm from "./LabelForm";
import LabelDropdownContent from "./LabelDropdownContent";
import { cn } from "@/lib/utils";
import type { ILabel } from "@/types/api/labels";

interface LabelDropdownProps {
  boardId: string;
}

type LabelEditionDataMode = "create" | "edit" | "none";

export interface LabelEditionData {
  mode: LabelEditionDataMode;
  initialData?: null | ILabel;
}

const labelDropdownTitles: Record<LabelEditionDataMode, string> = {
  create: "Create label",
  edit: "Edit label",
  none: "Labels",
};

function LabelDropdown({ boardId }: LabelDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [labelEditionData, setLabelEditionData] =
    React.useState<LabelEditionData>({ mode: "none", initialData: null });

  const onGoBack = () => {
    setLabelEditionData({ mode: "none", initialData: null });
  };

  const labelDropdownContent: Record<LabelEditionDataMode, React.ReactNode> =
    React.useMemo(
      () => ({
        create: (
          <LabelForm
            setLabelEditionData={setLabelEditionData}
            boardId={boardId}
            mode="create"
          />
        ),
        edit: (
          <LabelForm
            setLabelEditionData={setLabelEditionData}
            boardId={boardId}
            mode="edit"
            initialData={labelEditionData.initialData}
          />
        ),
        none: (
          <LabelDropdownContent
            boardId={boardId}
            setLabelEditionData={setLabelEditionData}
          />
        ),
      }),
      [boardId, labelEditionData.initialData]
    );

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger
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
      <Popover.Portal>
        <Popover.Positioner
          side="bottom"
          align="start"
          sideOffset={4}
          className="z-50"
        >
          <Popover.Popup className="min-w-[300px] px-2 py-3 bg-dropdown-bg shadow-2xl shadow-dropdown-shadow rounded-md">
            <div className="border-b border-gray-500 mb-3 pb-2 flex items-center justify-between">
              <Button
                className={cn("size-8 p-0 opacity-0 pointer-events-none", {
                  "pointer-events-auto! opacity-100!":
                    labelEditionData.mode === "create" ||
                    labelEditionData.mode === "edit",
                })}
                onClick={onGoBack}
              >
                <ChevronLeft />
              </Button>
              <p className="text-sm text-center font-semibold -ml-8">
                {labelDropdownTitles[labelEditionData.mode]}
              </p>

              <span />
            </div>

            {labelDropdownContent[labelEditionData.mode]}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default LabelDropdown;
