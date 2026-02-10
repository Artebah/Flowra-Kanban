import type { TBoardColumns } from "../../types/api/columns";
import axiosInstance from "./axiosInstance";

export const getBoardColumns = async (
  boardId: string
): Promise<TBoardColumns> => {
  const res = await axiosInstance.get(`/boards/${boardId}/columns`);
  return res.data;
};
