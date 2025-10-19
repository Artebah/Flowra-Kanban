import { EllipsisVerticalIcon } from "lucide-react";
import Dropdown from "../Dropdown";
import Button from "../Button";
import Modal from "../Modal";
import React from "react";
import type { IColumn } from "../../types/IColumn";
import { useRemoveColumn } from "../../store/kanban/selectors";

interface ColumnActionsDropdownProps {
  setIsAddCardOpen: (open: boolean) => void;
  column: IColumn;
}

function ColumnActionsDropdown({
  setIsAddCardOpen,
  column,
}: ColumnActionsDropdownProps) {
  const [openDeleteColumnModal, setOpenDeleteColumnModal] =
    React.useState(false);
  const removeColumn = useRemoveColumn();

  const onDeleteColumn = () => {
    removeColumn(column.id);
    setOpenDeleteColumnModal(false);
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Target asChild>
          <Button
            isIconOnly
            variant="outline"
            className="h-8 w-8 border-0 hover:bg-gray-700"
          >
            <EllipsisVerticalIcon className="size-4" />
          </Button>
        </Dropdown.Target>

        <Dropdown.Menu align="right">
          <Dropdown.MenuItem onClick={() => setIsAddCardOpen(true)}>
            <div className="flex items-center gap-2">Add task in column</div>
          </Dropdown.MenuItem>

          <Dropdown.MenuItem
            onClick={() => setOpenDeleteColumnModal(true)}
            destructive
          >
            <div className="flex items-center gap-2">Delete Column</div>
          </Dropdown.MenuItem>
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
