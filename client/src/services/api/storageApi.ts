import type {
  GetUploadUrlOptions,
  GetUploadUrlResponse,
} from "../../types/api/storage";
import axiosInstance from "./axiosInstance";

export const getUploadUrl = async ({
  dto,
}: GetUploadUrlOptions): Promise<GetUploadUrlResponse> => {
  const { data } = await axiosInstance.post("upload-url", dto);
  return data;
};
