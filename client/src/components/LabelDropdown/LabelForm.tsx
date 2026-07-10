import { labelColors } from "@/constants/labelColors";
import Input from "../Input";
import type { FormEvent } from "react";
import { Check } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import type { LabelEditionData } from ".";

interface LabelFormProps extends LabelEditionData {}

function LabelForm({ initialData, mode }: LabelFormProps) {
  const [selectedBgColor, setSelectedBgColor] = React.useState<
    string | undefined
  >(initialData?.color);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onSelectBgColor = (color: string) => {
    setSelectedBgColor(color);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="mb-2 inline-block" htmlFor="create-label-form-title">
          Title
        </label>
        <Input
          type="text"
          defaultValue={initialData?.title}
          className="border border-gray-400 w-full"
          id="create-label-form-title"
        />

        <div className="mt-3 space-y-2">
          <p className="mb-2 inline-block">Select a color</p>
          <div className="grid grid-cols-5 gap-2">
            {labelColors.map((labelColor, index) => (
              <button
                onClick={() => onSelectBgColor(labelColor.bg)}
                key={index}
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
