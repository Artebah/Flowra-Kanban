import { EllipsisVerticalIcon } from "lucide-react";
import Dropdown from "../Dropdown";
import Button from "../Button";
import Modal from "../Modal";
import React from "react";
import type { IColumn } from "../../types/IColumn";
import { useRemoveColumn } from "../../store/kanban/selectors";
import ColumnColorsDropdown from "./ColumnColorsDropdown";

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

  const onDeleteColumn = () => {
    removeColumn(column.id);
    setOpenDeleteColumnModal(false);
  };

  React.useEffect(() => {
    setAllowDraggingColumn(!openActions && !openDeleteColumnModal);
  }, [openDeleteColumnModal, openActions, setAllowDraggingColumn]);

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

      <ColumnColorsDropdown
        columnId={column.id}
        openColors={openColors}
        setOpenActions={setOpenActions}
        setOpenColors={setOpenColors}
      />

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
