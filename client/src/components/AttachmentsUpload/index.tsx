import React from "react";
import Button from "../Button";
import { PaperclipIcon } from "lucide-react";
import { useGetTaskUploadUrl } from "@/hooks/api/tasks/useGetTaskUploadUrl";
import { TaskAssetPurpose } from "@/types/api/tasks";
import axios from "axios";
import { TASK_ATTACHMENT_MAX_SIZE } from "@/constants/taskAttachmentMaxSize";
import toast from "react-hot-toast";

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

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      if (file.size > TASK_ATTACHMENT_MAX_SIZE) {
        toast.error(`${file.name} has reached max size (5MB)`);
        return false;
      }
      return true;
    });

    // TODO: Promise.all needed for future. Since we want save public urls in db after all files uploaded
    await Promise.all(
      validFiles.map(async (file) => {
        const { uploadUrl, publicUrl } = await getUploadUrl.mutateAsync({
          boardId,
          columnId,
          taskId,
          dto: {
            fileName: file.name,
            fileType: file.type,
            purpose: TaskAssetPurpose.ATTACHMENT,
          },
        });

        await axios({
          url: uploadUrl,
          data: file,
          method: "PUT",
          headers: { "Content-Type": file.type },
        });

        console.log(publicUrl);
      })
    );
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
