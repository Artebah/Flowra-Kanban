import { labelColors } from "@/constants/labelColors";
import Input from "../Input";
import type { FormEvent } from "react";
import { Check } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import type { LabelEditionData } from ".";
import { useUpdateLabel } from "@/hooks/api/labels/useUpdateLabel";
import Button from "../Button";
import { useCreateLabelAndAssignToTask } from "@/hooks/api/labels/useCreateLabelAndAssignToTask";
import { useModalDetailsData } from "@/store/kanban/selectors";
import { useDeleteLabel } from "@/hooks/api/labels/useDeleteLabel";

interface LabelFormProps extends LabelEditionData {
  setLabelEditionData: React.Dispatch<React.SetStateAction<LabelEditionData>>;
}

function LabelForm({ setLabelEditionData, initialData, mode }: LabelFormProps) {
  const { boardId, taskId } = useModalDetailsData();
  const deleteLabel = useDeleteLabel();

  const [selectedBgColor, setSelectedBgColor] = React.useState(
    initialData?.color
  );
  const [updatedTitle, setUpdatedTitle] = React.useState(
    initialData?.title ?? ""
  );
  const updateLabelMutation = useUpdateLabel();
  const createLabelAndAssignToTaskMutation = useCreateLabelAndAssignToTask();

  React.useEffect(() => {
    if (mode === "create") {
      setSelectedBgColor(labelColors[0].bg);
    }
  }, [mode]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (mode) {
      case "create":
        if (selectedBgColor && taskId && boardId) {
          createLabelAndAssignToTaskMutation.mutate(
            {
              boardId: boardId,
              taskId: taskId,
              createLabelDto: {
                color: selectedBgColor,
                title: updatedTitle.trim() || undefined,
              },
            },
            {
              onSuccess: () =>
                setLabelEditionData({ mode: "none", initialData: null }),
            }
          );
        }
        return;
      case "edit":
        if (initialData && boardId && taskId) {
          updateLabelMutation.mutate(
            {
              boardId: boardId,
              labelId: initialData.id,
              taskId: taskId,
              updateLabelDto: {
                color: selectedBgColor,
                title: updatedTitle.trim() || undefined,
              },
            },
            {
              onSuccess: () =>
                setLabelEditionData({ mode: "none", initialData: null }),
            }
          );
        }
        return;
    }
  };

  const onDeleteLabel = (labelId?: string) => {
    if (boardId && labelId && taskId) {
      deleteLabel.mutate(
        { boardId, labelId, taskId },
        {
          onSuccess: () => {
            setLabelEditionData({ mode: "none", initialData: null });
          },
        }
      );
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
                  className={cn("text-white hidden", {
                    block: selectedBgColor === labelColor.bg,
                  })}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-2 flex gap-2">
          <Button
            variant="primary"
            className="grow"
            type="submit"
            disabled={updateLabelMutation.isPending || !selectedBgColor}
          >
            {mode === "create" ? "Create" : "Edit"}
          </Button>
          {mode === "edit" && (
            <Button
              onClick={() => onDeleteLabel(initialData?.id)}
              variant="outline"
              className="grow border-red-400 bg-red-500! hover:bg-red-600!"
              type="button"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

export default LabelForm;
