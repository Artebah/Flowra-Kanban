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
  const isImage = webSupportedImageExtensions.includes(extention);

  return (
    <div className="flex items-center gap-4">
      <div className="h-12 w-16 rounded-sm overflow-hidden bg-gray-dim flex justify-center items-center">
        {isImage ? (
          <img
            src={attachment.url}
            alt={attachment.fileName}
            className="size-full object-contain"
          />
        ) : (
          <p className="font-bold text-base">{extention}</p>
        )}
      </div>

      <div>
        <p className="text-gray-200 text-xs font-bold">{attachment.fileName}</p>
        <p className="text-gray-400 text-xs">Added 42 minutes ago</p>
      </div>
    </div>
  );
}

export default TaskAttachmentsItem;
