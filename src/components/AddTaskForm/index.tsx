import { PlusIcon } from "lucide-react";
import Button from "../Button";
import Textarea from "../Textarea";
import React from "react";
import { useAddTask } from "../../store/kanban/selectors";

interface AddTaskFormProps {
  columnId: string;
}

function AddTaskForm({ columnId }: AddTaskFormProps) {
  const [isAddCardOpen, setIsAddCardOpen] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const addTask = useAddTask();

  React.useEffect(() => {
    if (isAddCardOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isAddCardOpen, textareaRef]);

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const titleValue = textareaRef.current?.value.trim();

    if (titleValue !== undefined && titleValue !== "") {
      addTask(titleValue, columnId);
    }

    handleOpen(false);
  };

  const handleOpen = (open: boolean) => setIsAddCardOpen(open);

  return (
    <form onSubmit={handleAddTask}>
      {isAddCardOpen && <Textarea ref={textareaRef} />}

      <div className="flex gap-2 mt-2">
        {isAddCardOpen ? (
          <>
            <Button
              type="button"
              variant="outline"
              className="grow"
              onClick={() => handleOpen(false)}>
              Скасувати
            </Button>
            <Button type="submit" variant="success" className="grow">
              Додати
            </Button>
          </>
        ) : (
          <Button
            onClick={() => handleOpen(true)}
            type="button"
            fullWidth
            className="justify-start"
            leadingIcon={<PlusIcon />}>
            Додати картку
          </Button>
        )}
      </div>
    </form>
  );
}

export default AddTaskForm;
