import React from "react";
import Button from "../Button";
import { PaperclipIcon } from "lucide-react";
import { useGetTaskUploadUrl } from "@/hooks/api/tasks/useGetTaskUploadUrl";
import { TaskAssetPurpose } from "@/types/api/tasks";
import axios from "axios";

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
  const getUploadUrl = useGetTaskUploadUrl();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      getUploadUrl.mutate(
        {
          boardId,
          columnId,
          taskId,
          dto: {
            fileName: file.name,
            fileType: file.type,
            purpose: TaskAssetPurpose.ATTACHMENT,
          },
        },
        {
          onSuccess: ({ publicUrl, uploadUrl }) => {
            console.log(publicUrl, uploadUrl);
            axios({
              url: uploadUrl,
              data: file,
              method: "PUT",
              headers: { "Content-Type": file.type },
            });
          },
        }
      );
    }
  };

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
        onChange={onChange}
        ref={inputRef}
        type="file"
        className="size-0 opacity-0"
      />
    </div>
  );
}

export default AttachmentsUpload;
