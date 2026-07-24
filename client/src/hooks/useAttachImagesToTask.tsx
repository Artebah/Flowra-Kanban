import React from "react";
import { useGetUploadUrl } from "./api/storage/useGetUploadUrl";
import { useSaveAttachments } from "./api/tasks/useSaveAttachments";
import toast from "react-hot-toast";
import { TASK_ATTACHMENT_MAX_SIZE } from "@/constants/taskAttachmentMaxSize";
import type { SaveAttachmentsDtoItem } from "@/types/api/tasks";
import axios from "axios";

export const useAttachImagesToTask = ({
  boardId,
  taskId,
}: {
  taskId: string;
  boardId: string;
}) => {
  const getUploadUrl = useGetUploadUrl();
  const saveAttachments = useSaveAttachments();

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

    Promise.all(
      validFiles.map(async (file): Promise<SaveAttachmentsDtoItem> => {
        const { uploadUrl, publicUrl } = await getUploadUrl.mutateAsync({
          dto: {
            folder: `boards/${boardId}/tasks/${taskId}/attachments`,
            fileName: file.name,
            fileType: file.type,
          },
        });

        await axios({
          url: uploadUrl,
          data: file,
          method: "PUT",
          headers: { "Content-Type": file.type },
        });

        return {
          fileName: file.name,
          url: publicUrl,
        };
      })
    )
      .then((data) => {
        saveAttachments.mutate({ dto: { attachments: data }, boardId, taskId });
      })
      .catch(() => toast.error("Couldn't upload files"));
  };

  return { onChange };
};
