import React from "react";
import Button from "../Button";
import { PaperclipIcon } from "lucide-react";
import { FILE_MAX_SIZE } from "@/constants/fileMaxSize";
import { useAttachImagesToTask } from "@/hooks/useAttachImagesToTask";

interface AttachmentsUploadProps {
  boardId: string;
  taskId: string;
}

function AttachmentsUpload({ boardId, taskId }: AttachmentsUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { onChange } = useAttachImagesToTask({ boardId, taskId });

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
        size={FILE_MAX_SIZE}
        type="file"
        className="size-0 opacity-0"
      />
    </div>
  );
}

export default AttachmentsUpload;
