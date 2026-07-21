import { useMutation } from "@tanstack/react-query";
import type {
  GetTaskUploadUrlOptions,
  GetTaskUploadUrlResponse,
} from "../../../types/api/tasks";
import { getTaskUploadUrl } from "../../../services/api/tasksApi";

export const useGetTaskUploadUrl = () => {
  return useMutation<GetTaskUploadUrlResponse, Error, GetTaskUploadUrlOptions>({
    mutationFn: (options) => getTaskUploadUrl(options),
  });
};
