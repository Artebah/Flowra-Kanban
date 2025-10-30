import { ChevronLeftIcon, EllipsisVerticalIcon } from "lucide-react";
import Dropdown from "../Dropdown";
import Button from "../Button";
import Modal from "../Modal";
import React from "react";
import type { IColumn } from "../../types/IColumn";
import { useRemoveColumn, useUpdateColumn } from "../../store/kanban/selectors";
import { columnColorsDarkTheme } from "../../constants/columnColors";

interface ColumnActionsDropdownProps {
  setIsAddCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAllowDraggingColumn: React.Dispatch<React.SetStateAction<boolean>>;
  column: IColumn;
}

function ColumnActionsDropdown({
  setIsAddCardOpen,
  setAllowDraggingColumn,
  column,
}: ColumnActionsDropdownProps) {
  const [openDeleteColumnModal, setOpenDeleteColumnModal] =
    React.useState(false);
  const removeColumn = useRemoveColumn();
  const [openActions, setOpenActions] = React.useState(false);
  const [openColors, setOpenColors] = React.useState(false);
  const updateColumn = useUpdateColumn();

  const onDeleteColumn = () => {
    removeColumn(column.id);
    setOpenDeleteColumnModal(false);
  };

  React.useEffect(() => {
    setAllowDraggingColumn(!openActions && !openDeleteColumnModal);
  }, [openDeleteColumnModal, openActions, setAllowDraggingColumn]);

  const onGoBackToActions = () => {
    setOpenColors(false);
    setOpenActions(true);
  };

  const onChangeColumnColor = (color?: string) => {
    updateColumn(column.id, { color });
  };

  return (
    <>
      <Dropdown onChange={(open) => setOpenActions(open)} open={openActions}>
        <Dropdown.Target asChild>
          <Button
            isIconOnly
            variant="outline"
            className="h-8 w-8 border-0 hover:bg-gray-700"
          >
            <EllipsisVerticalIcon className="size-4" />
          </Button>
        </Dropdown.Target>

        <Dropdown.Menu className="min-w-[180px]" align="right">
          <Dropdown.MenuItem onClick={() => setIsAddCardOpen(true)}>
            <div className="flex items-center gap-2">Add task in column</div>
          </Dropdown.MenuItem>

          <Dropdown.MenuItem
            onClick={() => setOpenDeleteColumnModal(true)}
            destructive
          >
            <div className="flex items-center gap-2">Delete Column</div>
          </Dropdown.MenuItem>
          <Dropdown.MenuItem onClick={() => setOpenColors(true)}>
            Change column color
          </Dropdown.MenuItem>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown open={openColors} onChange={(open) => setOpenColors(open)}>
        <Dropdown.Menu
          className="mt-5 min-w-[250px] px-3 pt-2 pb-5"
          align="right"
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
                onClick={() => onChangeColumnColor(columnColor.color)}
                className="rounded-md size-10 cursor-pointer transition-all hover:brightness-125"
                style={{ backgroundColor: columnColor.previewColor }}
                title={columnColor.label}
              />
            ))}
          </div>
          <div className="mt-3">
            <Button
              onClick={() => onChangeColumnColor(undefined)}
              className="w-full bg-white/5 hover:bg-white/10"
            >
              Set default
            </Button>
          </div>
        </Dropdown.Menu>
      </Dropdown>

      <Modal
        className="bg-gray-charcoal"
        open={openDeleteColumnModal}
        onClose={() => setOpenDeleteColumnModal(false)}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">
            Are you sure you want to delete column "{column.title}"?
          </h2>
          <div className="flex justify-end gap-2">
            <Button
              onClick={onDeleteColumn}
              variant="default"
              className="bg-red-500 hover:!bg-red-600"
            >
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpenDeleteColumnModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ColumnActionsDropdown;
