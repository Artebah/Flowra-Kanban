import { labelColors } from "@/constants/labelColors";
import Input from "../Input";
import type { FormEvent } from "react";

interface InitialData {
  title: string;
  color: string;
}

interface LabelFormProps {
  initialData?: InitialData;
  mode: "create" | "edit";
}

function LabelForm({ initialData, mode }: LabelFormProps) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <div>
            {labelColors.map((labelColor) => (
              <button style={{ backgroundColor: labelColor }}></button>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}

export default LabelForm;
