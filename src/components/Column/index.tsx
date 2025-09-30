import type {IColumn} from "../../types/IColumn";
import type {ITask} from "../../types/ITask";
import Task from "../Task";
import Button from "../Button";
import {EllipsisVerticalIcon} from "lucide-react";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddTaskForm from "../AddTaskForm";
import EmptyColumn from "./EmptyColumn";
import {useDroppable} from "@dnd-kit/core";
import React, {useEffect, useRef, useState} from "react";
import Input from "../Input";

interface ColumnProps {
    column: IColumn;
    tasks: ITask[];
}

function Column({column, tasks}: ColumnProps) {
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [isTitleInput, setIsTitleInput] = useState(false)
    const {setNodeRef: setEndDropNodeRef} = useDroppable({
        id: `end-droppable-${column.id}`,
    });

    useEffect(() => {
        if (isTitleInput && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isTitleInput, titleInputRef]);

    const openTitleInput = () => {
        setIsTitleInput(true);
    };

    const closeTitleInput = () => {
        setIsTitleInput(false);
    };

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        column.title = e.target.value;
        closeTitleInput()
    }

    return (
        <div className="bg-gray-charcoal py-3 px-3 rounded-xl max-w-[300px] w-full flex flex-col gap-2">
            <div className="flex items-center">
                <div
                    className="font-semibold h-10 pl-2 flex items-center grow text-white cursor-pointer">
                    {isTitleInput ? <Input ref={titleInputRef} defaultValue={column.title} onBlur={onChangeTitle}/> :
                        <p className='w-full' onClick={openTitleInput}>
                            {column.title}
                        </p>}
                </div>
                <Button isIconOnly>
                    <EllipsisVerticalIcon/>
                </Button>
            </div>
            <div className="flex flex-col gap-1 min-h-28">
                <SortableContext
                    id={"sortable-column-" + column.id}
                    items={tasks}
                    strategy={verticalListSortingStrategy}>
                    {tasks.length === 0 && <EmptyColumn columnId={column.id}/>}
                    {tasks.map((task) => (
                        <Task key={task.id} task={task}/>
                    ))}
                </SortableContext>
                {/* Droppable area at the end of the column for dropping at last position */}
                {tasks.length > 0 && (
                    <div
                        ref={setEndDropNodeRef}
                        className="h-0.5 grow w-full bg-transparent"
                        aria-hidden="true"
                    />
                )}
            </div>

            <AddTaskForm columnId={column.id}/>
        </div>
    );
}

export default Column;
