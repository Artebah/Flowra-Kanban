import { labelColors } from "@/constants/labelColors";
import Input from "../Input";
import type { FormEvent } from "react";
import { Check } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import type { LabelEditionData } from ".";

interface LabelFormProps extends LabelEditionData {}

function LabelForm({ initialData, mode }: LabelFormProps) {
  const [selectedBgColor, setSelectedBgColor] = React.useState(
    initialData?.color
  );
  const [updatedTitle, setUpdatedTitle] = React.useState(
    initialData?.title ?? ""
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (mode) {
      case "create":
        // TODO: add functionality
        return;
      case "edit":
        // TODO: add functionality
        return;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="mb-2 inline-block" htmlFor="create-label-form-title">
          Title
        </label>
        <Input
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          type="text"
          className="w-full"
          id="create-label-form-title"
        />

        <div className="mt-3 space-y-2">
          <p className="mb-2 inline-block">Select a color</p>
          <div className="grid grid-cols-5 gap-2">
            {labelColors.map((labelColor) => (
              <button
                type="button"
                onClick={() => setSelectedBgColor(labelColor.bg)}
                key={labelColor.bg}
                className="cursor-pointer flex justify-center items-center h-8 rounded-sm border transition-transform hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: labelColor.bg,
                  borderColor: labelColor.border,
                }}
              >
                <Check
                  className={cn("text-black hidden", {
                    block: selectedBgColor === labelColor.bg,
                  })}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}

export default LabelForm;
