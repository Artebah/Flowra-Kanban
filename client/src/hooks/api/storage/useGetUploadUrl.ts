import { useMutation } from "@tanstack/react-query";
import type {
  GetUploadUrlOptions,
  GetUploadUrlResponse,
} from "../../../types/api/storage";
import { getUploadUrl } from "../../../services/api/storageApi";

export const useGetUploadUrl = () => {
  return useMutation<GetUploadUrlResponse, Error, GetUploadUrlOptions>({
    mutationFn: (options) => getUploadUrl(options),
  });
};
