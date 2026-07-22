import { useGetAttachments } from "@/hooks/api/tasks/useGetAttachments";
import TaskAttachmentsItem from "./TaskAttachmentsItem";
import { Paperclip } from "lucide-react";
import Button from "../Button";

interface TaskAttachmentsProps {
  boardId: string;
  taskId: string;
}

function TaskAttachments({ boardId, taskId }: TaskAttachmentsProps) {
  const { data: attachments = [] } = useGetAttachments(boardId, taskId);

  return (
    <div className="mt-8 px-6 pb-8">
      <div className="flex justify-between gap-3 items-center">
        <div className="flex items-center gap-3">
          <Paperclip /> <p className="font-bold">Attachments</p>
        </div>

        <Button className="h-8 leading-0" variant="outline">
          Add
        </Button>
      </div>

      <div className="pl-9">
        <p className="font-bold text-xs mt-4 text-gray-300">Files</p>

        <div className="mt-3 flex flex-col gap-2">
          {attachments.map((attachment) => {
            const extention = attachment.fileName.split(".")[1];

            return (
              <TaskAttachmentsItem
                attachment={attachment}
                extention={extention}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TaskAttachments;
