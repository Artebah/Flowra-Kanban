import { PlusIcon } from "lucide-react";
import { useState, useRef } from "react";
import Button from "../Button";
import Input from "../Input";
import { useAddNewColumn } from "../../store/kanban/selectors";

function AddColumnForm() {
  const [isToggled, setIsToggled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const addNewColumn = useAddNewColumn();

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Gather form data from ref
    const title = inputRef.current?.value.trim() || "";

    // Call the add column function with the gathered data
    if (title) {
      addNewColumn(title);
      // Reset form and close
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setIsToggled(false);
    }
  };

  return (
    <div className="max-w-[300px] w-full">
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
            <Button type="submit" variant="success" className="flex-1">
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
