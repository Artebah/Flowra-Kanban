import { webSupportedImageExtensions } from "@/constants/webSupportedImageExtensions";
import type { TaskAttachment } from "@/types/api/tasks";

interface TaskAttachmentsItemProps {
  attachment: TaskAttachment;
  extention: string;
}

function TaskAttachmentsItem({
  attachment,
  extention,
}: TaskAttachmentsItemProps) {
  if (webSupportedImageExtensions.includes(extention)) {
    return (
      <img
        src={attachment.url}
        alt={attachment.fileName}
        className="w-full h-96 object-contain"
      />
    );
  }
}

export default TaskAttachmentsItem;
