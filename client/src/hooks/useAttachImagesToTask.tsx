import React from "react";
import { useGetTaskUploadUrl } from "./api/tasks/useGetTaskUploadUrl";
import { useSaveAttachments } from "./api/tasks/useSaveAttachments";
import toast from "react-hot-toast";
import { TASK_ATTACHMENT_MAX_SIZE } from "@/constants/taskAttachmentMaxSize";
import {
  TaskAssetPurpose,
  type SaveAttachmentsDtoItem,
} from "@/types/api/tasks";
import axios from "axios";

export const useAttachImagesToTask = ({
  boardId,
  columnId,
  taskId,
}: {
  taskId: string;
  boardId: string;
  columnId: string;
}) => {
  const getUploadUrl = useGetTaskUploadUrl();

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
