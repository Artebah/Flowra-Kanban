import type {
  BoardColumn,
  TBoardColumns,
  UpdateColumnDto,
} from "../../types/api/columns";
import axiosInstance from "./axiosInstance";

export const getBoardColumns = async (
  boardId: string
): Promise<TBoardColumns> => {
  const res = await axiosInstance.get(`/boards/${boardId}/columns`);
  return res.data;
};

export const patchColumn = async (
  boardId: string,
  columnId: string,
  updateColumnDto: UpdateColumnDto
): Promise<BoardColumn> => {
  const res = await axiosInstance.patch(
    `/boards/${boardId}/columns/${columnId}`,
    updateColumnDto
  );
  return res.data;
};
