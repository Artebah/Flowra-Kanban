import React from "react";
import Button from "../Button";
import { PaperclipIcon } from "lucide-react";
import { TASK_ATTACHMENT_MAX_SIZE } from "@/constants/taskAttachmentMaxSize";
import { useAttachImagesToTask } from "@/hooks/useAttachImagesToTask";

interface AttachmentsUploadProps {
  boardId: string;
  columnId: string;
  taskId: string;
}

function AttachmentsUpload({
  boardId,
  columnId,
  taskId,
}: AttachmentsUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { onChange } = useAttachImagesToTask({ boardId, columnId, taskId });

  return (
    <div>
      <Button
        onClick={() => inputRef.current?.click()}
        leadingIcon={<PaperclipIcon className="size-4" />}
        variant="outline"
        className="h-8 px-2"
      >
        Attachment
      </Button>

      <input
        multiple
        onChange={onChange}
        ref={inputRef}
        size={TASK_ATTACHMENT_MAX_SIZE}
        type="file"
        className="size-0 opacity-0"
      />
    </div>
  );
}

export default AttachmentsUpload;
