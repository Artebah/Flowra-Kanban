import type { ILabel } from "@/types/api/labels";
import axiosInstance from "./axiosInstance";

export const getLabelsList = async (boardId: string): Promise<ILabel[]> => {
  const res = await axiosInstance.get(`/boards/${boardId}/labels`);
  return res.data;
};
