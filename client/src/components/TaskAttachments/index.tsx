import { useGetAttachments } from "@/hooks/api/tasks/useGetAttachments";

interface TaskAttachmentsProps {
  boardId: string;
  taskId: string;
}

function TaskAttachments({ boardId, taskId }: TaskAttachmentsProps) {
  const { data: attachments = [] } = useGetAttachments(boardId, taskId);
  return (
    <>
      {attachments.map((attachment) => (
        <img
          src={attachment.url}
          alt={attachment.fileName}
          className="w-full h-96 object-contain"
        />
      ))}
    </>
  );
}

export default TaskAttachments;
