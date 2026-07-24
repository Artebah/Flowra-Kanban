import { useGetAttachments } from "@/hooks/api/tasks/useGetAttachments";
import TaskAttachmentsItem from "./TaskAttachmentsItem";
import { Paperclip } from "lucide-react";
import Button from "../Button";
import { useAttachImagesToTask } from "@/hooks/useAttachImagesToTask";
import React from "react";
import { TASK_ATTACHMENT_MAX_SIZE } from "@/constants/taskAttachmentMaxSize";

interface TaskAttachmentsProps {
  boardId: string;
  taskId: string;
}

function TaskAttachments({ boardId, taskId }: TaskAttachmentsProps) {
  const { data: attachments = [] } = useGetAttachments(boardId, taskId);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { onChange } = useAttachImagesToTask({ boardId, taskId });

  return (
    <div className="px-6 pb-8">
      <div className="flex justify-between gap-3 items-center">
        <div className="flex items-center gap-3">
          <Paperclip /> <p className="font-bold">Attachments</p>
        </div>

        <Button
          onClick={() => inputRef.current?.click()}
          className="h-8 leading-0"
          variant="outline"
        >
          Add
        </Button>
      </div>
      <input
        multiple
        onChange={onChange}
        ref={inputRef}
        size={TASK_ATTACHMENT_MAX_SIZE}
        type="file"
        className="size-0 opacity-0"
      />

      <div className="pl-9">
        <p className="font-bold text-xs text-gray-300">Files</p>

        <div className="mt-3 flex flex-col gap-2">
          {attachments.map((attachment) => {
            const extention = attachment.fileName.split(".")[1];

            return (
              <TaskAttachmentsItem
                attachment={attachment}
                extention={extention}
                boardId={boardId}
                taskId={taskId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TaskAttachments;
