import React from "react";
import LabelForm from "./LabelForm";
import LabelDropdownContent from "./LabelDropdownContent";
import type { ILabel } from "@/types/api/labels";
import Popover from "../Popover";

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

interface LabelDropdownProps {
  TriggerComponent: React.ReactElement;
}

function LabelDropdown({ TriggerComponent }: LabelDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [labelEditionData, setLabelEditionData] =
    React.useState<LabelEditionData>({ mode: "none", initialData: null });

  const onGoBack = () => {
    setLabelEditionData({ mode: "none", initialData: null });
  };

  const allowGoBack =
    labelEditionData.mode === "create" || labelEditionData.mode === "edit";

  const labelDropdownContent: Record<LabelEditionDataMode, React.ReactNode> =
    React.useMemo(
      () => ({
        create: (
          <LabelForm setLabelEditionData={setLabelEditionData} mode="create" />
        ),
        edit: (
          <LabelForm
            setLabelEditionData={setLabelEditionData}
            mode="edit"
            initialData={labelEditionData.initialData}
          />
        ),
        none: (
          <LabelDropdownContent setLabelEditionData={setLabelEditionData} />
        ),
      }),
      [labelEditionData.initialData]
    );

  return (
    <Popover
      showCloseButton
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onGoBack={allowGoBack ? onGoBack : undefined}
      title={labelDropdownTitles[labelEditionData.mode]}
      triggerRender={TriggerComponent}
    >
      {labelDropdownContent[labelEditionData.mode]}
    </Popover>
  );
}

export default LabelDropdown;
