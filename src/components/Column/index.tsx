import type { IColumn } from "../../types/IColumn";
import type { ITask } from "../../types/ITask";
import Task from "../Task";
import Button from "../Button";
import { EllipsisVerticalIcon } from "lucide-react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddTaskForm from "../AddTaskForm";

interface ColumnProps {
  column: IColumn;
  tasks: ITask[];
}

function Column({ column, tasks }: ColumnProps) {
  return (
    <div className="bg-gray-charcoal py-3 px-3 rounded-xl max-w-[300px] w-full flex flex-col gap-2">
      <div className="flex items-center">
        <p className="font-semibold h-10 pl-2 flex items-center grow text-white cursor-pointer">
          {column.title}
        </p>
        <Button isIconOnly>
          <EllipsisVerticalIcon />
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        <SortableContext
          id={"sortable-column-" + column.id}
          items={tasks}
          strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>

      <AddTaskForm columnId={column.id} />
    </div>
  );
}

export default Column;
