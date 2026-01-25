import type { TBoardsList } from "../../types/api/boards";
import axiosInstance from "./axiosInstance";

export const getBoardsListByUser = async (): Promise<TBoardsList> => {
  const res = await axiosInstance.get(`/boards`);
  return res.data;
};
