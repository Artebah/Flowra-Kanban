import { webSupportedImageExtensions } from "@/constants/webSupportedImageExtensions";
import type { TaskAttachment } from "@/types/api/tasks";
import Button from "../Button";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import Dropdown from "../Dropdown";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useRemoveAttachment } from "@/hooks/api/tasks/useRemoveAttachment";

interface TaskAttachmentsItemProps {
  attachment: TaskAttachment;
  extention: string;
  boardId: string;
  taskId: string;
}

function TaskAttachmentsItem({
  attachment,
  extention,
  boardId,
  taskId,
}: TaskAttachmentsItemProps) {
  const isImage = webSupportedImageExtensions.includes(extention);
  const removeAttachment = useRemoveAttachment();

  const onRemoveAttachment = () => {
    removeAttachment.mutate({
      boardId,
      taskId,
      dto: { attachmentId: attachment.id, url: attachment.url },
    });
  };

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

      <div className="grow">
        <p className="text-gray-200 text-xs font-bold">{attachment.fileName}</p>
        <p className="text-gray-400 text-xs">Added 42 minutes ago</p>
      </div>

      <div className="flex gap-2 items-center">
        <Button isIconOnly className="size-7 relative">
          <ExternalLink className="size-4" />

          <a
            className="absolute size-full opacity-0"
            href={attachment.url}
            target="_blank"
          />
        </Button>
        <Dropdown
          triggerRender={
            <Button variant="outline" className="size-7 p-0">
              <MoreHorizontal className="size-4" />
            </Button>
          }
        >
          <DropdownMenuItem
            className="text-red-500"
            onClick={onRemoveAttachment}
          >
            Remove
          </DropdownMenuItem>
        </Dropdown>
      </div>
    </div>
  );
}

export default TaskAttachmentsItem;
