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

        <Button variant="outline">Add</Button>
      </div>

      <div className="mt-3 ml-8">
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
  );
}

export default TaskAttachments;
