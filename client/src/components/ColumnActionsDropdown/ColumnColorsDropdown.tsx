import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { ChevronLeftIcon } from "lucide-react";
import Button from "../Button";
import { columnColorsDarkTheme } from "../../constants/columnColors";
import { useUpdateColumn } from "../../store/kanban/selectors";
import { usePatchColumn } from "../../hooks/api/columns/usePatchColumn";
import toast from "react-hot-toast";

interface ColumnColorsDropdownProps {
  openColors: boolean;
  setOpenColors: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenActions: React.Dispatch<React.SetStateAction<boolean>>;
  columnId: string;
  boardId: string;
}

function ColumnColorsDropdown({
  columnId,
  boardId,
  openColors,
  setOpenActions,
  setOpenColors,
}: ColumnColorsDropdownProps) {
  const updateColumn = useUpdateColumn();
  const { isPending: isLoadingPatchColumn, mutate: patchColumnMutate } =
    usePatchColumn();

  const onGoBackToActions = () => {
    setOpenColors(false);
    setOpenActions(true);
  };

  const onChangeColumnColor = (color: string | null) => {
    patchColumnMutate(
      {
        boardId,
        columnId,
        updateColumnDto: {
          color,
        },
      },
      {
        onSuccess() {
          updateColumn(columnId, { color: color || undefined });
        },
        onError() {
          toast.error("Couldn't update column color");
        },
      }
    );
  };

  return (
    <DropdownMenu open={openColors} onOpenChange={setOpenColors}>
      <DropdownMenuTrigger render={<span />} className="sr-only" />
      <DropdownMenuContent
        align="end"
        className="min-w-[250px] px-3 pt-2 pb-5"
      >
        <div className="flex gap-2 items-center">
          <Button onClick={onGoBackToActions} isIconOnly className="size-7">
            <ChevronLeftIcon />
          </Button>
          <p className="text-lg">Change column color</p>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mt-4 pt-4 border-t border-gray-500">
          {columnColorsDarkTheme.map((columnColor) => (
            <button
              disabled={isLoadingPatchColumn}
              key={columnColor.label}
              onClick={() => onChangeColumnColor(columnColor.color)}
              className="disabled:opacity-70 disabled:cursor-not-allowed rounded-md size-10 cursor-pointer transition-all hover:brightness-125"
              style={{ backgroundColor: columnColor.previewColor }}
              title={columnColor.label}
            />
          ))}
        </div>
        <div className="mt-3">
          <Button
            onClick={() => onChangeColumnColor(null)}
            className="w-full bg-white/5 hover:bg-white/10"
          >
            Set default
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ColumnColorsDropdown;
