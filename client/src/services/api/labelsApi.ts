import type { ILabel } from "@/types/api/labels";
import axiosInstance from "./axiosInstance";

export const getLabelsList = async (): Promise<ILabel[]> => {
  const res = await axiosInstance.get("/labels");
  return res.data;
};
