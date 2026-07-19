import { MoreVertical, TrashIcon } from "lucide-react";
import Button from "../Button";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
  useDeleteLocalTask,
  useModalDetailsData,
  useUpdateModalDetailsData,
} from "@/store/kanban/selectors";
import { useDeleteTask } from "@/hooks/api/tasks/useDeleteTask";
import type { ITaskDetails } from "@/types/api/tasks";
import Dropdown from "../Dropdown";

interface TaskDetailsActionsProps {
  taskDetails: ITaskDetails;
}

function TaskDetailsActions({ taskDetails }: TaskDetailsActionsProps) {
  const { boardId, taskId } = useModalDetailsData();

  const updateModalDetailsData = useUpdateModalDetailsData();

  const deleteTask = useDeleteTask();
  const deleteLocalTask = useDeleteLocalTask();

  const onDeleteTask = () => {
    if (boardId && taskId) {
      deleteTask.mutate(
        { boardId, taskId },
        {
          onSuccess: () => {
            deleteLocalTask(taskDetails);
            updateModalDetailsData({
              boardId: null,
              taskId: null,
              isOpen: false,
            });
          },
        }
      );
    }
  };

  return (
    <Dropdown
      triggerRender={
        <Button isIconOnly className="rounded-full size-10">
          <MoreVertical />
        </Button>
      }
    >
      <DropdownMenuItem
        disabled={deleteTask.isPending}
        onClick={onDeleteTask}
        className="text-red-500 hover:text-red-500! flex gap-3 items-center!"
      >
        <TrashIcon className="size-4" /> <p className="leading-0">Delete</p>
      </DropdownMenuItem>
    </Dropdown>
  );
}

export default TaskDetailsActions;
