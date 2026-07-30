import type {
  BoardColumn,
  CreateColumnOptions,
  DeleteColumnOptions,
  GetBoardColumnsOptions,
  PatchColumnOptions,
  ReorderColumnsOptions,
  TBoardColumns,
} from "../../types/api/columns";
import axiosInstance from "./axiosInstance";

export const getBoardColumns = async ({ boardId }: GetBoardColumnsOptions): Promise<TBoardColumns> => {
  const res = await axiosInstance.get(`/boards/${boardId}/columns`);
  return res.data;
};

export const createColumn = async ({
  boardId,
  dto,
}: CreateColumnOptions): Promise<BoardColumn> => {
  const res = await axiosInstance.post(`/boards/${boardId}/columns`, dto);
  return res.data;
};

export const patchColumn = async ({
  boardId,
  columnId,
  dto,
}: PatchColumnOptions): Promise<BoardColumn> => {
  const res = await axiosInstance.patch(
    `/boards/${boardId}/columns/${columnId}`,
    dto
  );
  return res.data;
};

export const deleteColumn = async ({
  boardId,
  columnId,
}: DeleteColumnOptions): Promise<void> => {
  await axiosInstance.delete(`/boards/${boardId}/columns/${columnId}`);
};

export const reorderColumns = async ({ boardId, dto }: ReorderColumnsOptions): Promise<void> => {
  await axiosInstance.patch(
    `/boards/${boardId}/columns/reorder`,
    dto
  );
};
