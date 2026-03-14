import { PlusIcon } from "lucide-react";
import Button from "../Button";
import Textarea from "../Textarea";
import React from "react";
import { useAddTask } from "../../store/kanban/selectors";
import { useCreateTask } from "../../hooks/api/tasks/useCreateTask";
import toast from "react-hot-toast";

interface AddTaskFormProps {
  columnId: string;
  boardId: string;
  isAddCardOpen: boolean;
  setIsAddCardOpen: (open: boolean) => void;
}

function AddTaskForm({
  columnId,
  boardId,
  isAddCardOpen,
  setIsAddCardOpen,
}: AddTaskFormProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const addTask = useAddTask();
  const createTask = useCreateTask();

  React.useEffect(() => {
    if (isAddCardOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isAddCardOpen, textareaRef]);

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const titleValue = textareaRef.current?.value.trim();

    if (titleValue !== undefined && titleValue !== "") {
      createTask.mutate(
        { boardId, columnId, createTaskDto: { title: titleValue } },
        {
          onSuccess: (task) => {
            addTask(task);
            handleOpen(false);
          },
          onError: (error) => {
            toast.error("Failed to create task." + error.message);
          },
        }
      );
    } else {
      handleOpen(false);
    }
  };

  const handleOpen = (open: boolean) => setIsAddCardOpen(open);

  return (
    <form onSubmit={handleAddTask}>
      {isAddCardOpen && <Textarea ref={textareaRef} />}

      {isAddCardOpen ? (
        <div className="mt-2 flex gap-1">
          <Button
            type="button"
            variant="outline"
            className="grow"
            onClick={() => handleOpen(false)}
          >
            Скасувати
          </Button>
          <Button type="submit" variant="success" className="grow">
            Додати
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            onClick={() => handleOpen(true)}
            type="button"
            fullWidth
            className="justify-start"
            leadingIcon={<PlusIcon />}
          >
            Add new task
          </Button>
        </div>
      )}
    </form>
  );
}

export default AddTaskForm;
