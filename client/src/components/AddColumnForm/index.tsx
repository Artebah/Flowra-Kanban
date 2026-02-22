import { PlusIcon } from "lucide-react";
import { useState, useRef } from "react";
import Button from "../Button";
import Input from "../Input";
import { useAddNewColumn } from "../../store/kanban/selectors";
import { useCreateColumn } from "../../hooks/api/columns/useCreateColumn";
import toast from "react-hot-toast";

interface AddColumnFormProps {
  boardId: string;
}

function AddColumnForm({ boardId }: AddColumnFormProps) {
  const [isToggled, setIsToggled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const addNewColumn = useAddNewColumn();
  const createColumn = useCreateColumn();

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Gather form data from ref
    const title = inputRef.current?.value.trim() || "";

    if (title) {
      createColumn.mutate(
        { boardId, createColumnDto: { title } },
        {
          onSuccess: (column) => {
            addNewColumn(column);

            // Reset form and close
            if (inputRef.current) {
              inputRef.current.value = "";
            }
            setIsToggled(false);
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    }
  };

  return (
    <div className="max-w-[300px] min-w-fit w-full">
      {!isToggled ? (
        <Button
          fullWidth
          className="bg-gray-charcoal hover:bg-white/10"
          leadingIcon={<PlusIcon className="size-5" />}
          onClick={handleToggle}
        >
          Add new column
        </Button>
      ) : (
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Enter column title..."
            autoFocus
          />
          <div className="flex gap-2">
            <Button
              disabled={createColumn.isPending}
              type="submit"
              variant="success"
              className="flex-1"
            >
              Add Column
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleToggle}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddColumnForm;
