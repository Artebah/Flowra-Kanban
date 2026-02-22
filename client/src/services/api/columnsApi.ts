import type {
  BoardColumn,
  CreateColumnDto,
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

export const createColumn = async (
  boardId: string,
  createColumnDto: CreateColumnDto
): Promise<BoardColumn> => {
  const res = await axiosInstance.post(
    `/boards/${boardId}/columns`,
    createColumnDto
  );
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

export const deleteColumn = async (
  boardId: string,
  columnId: string
): Promise<void> => {
  await axiosInstance.delete(`/boards/${boardId}/columns/${columnId}`);
};
