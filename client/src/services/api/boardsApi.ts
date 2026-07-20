import type {
  BoardByIdResponse,
  CreateBoardDto,
  GetBoardMembersOptions,
  IBoard,
  TBoardsList,
  UpdateBoardDto,
} from "../../types/api/boards";
import type { User } from "../../types/api/auth";
import axiosInstance from "./axiosInstance";

export const getBoardsListByUser = async (): Promise<TBoardsList> => {
  const res = await axiosInstance.get(`/boards`);
  return res.data;
};

export const createBoard = async (
  createBoardDto: CreateBoardDto
): Promise<IBoard> => {
  const res = await axiosInstance.post(`/boards`, createBoardDto);
  return res.data;
};

export const getBoardById = async (
  boardId: string
): Promise<BoardByIdResponse> => {
  const res = await axiosInstance.get(`/boards/${boardId}`);
  return res.data;
};

export const deleteBoard = async (boardId: string): Promise<void> => {
  await axiosInstance.delete(`/boards/${boardId}`);
};

export const updateBoard = async (
  boardId: string,
  dto: UpdateBoardDto
): Promise<IBoard> => {
  const res = await axiosInstance.patch(`/boards/${boardId}`, dto);
  return res.data;
};

export const getBoardMembers = async ({
  boardId,
}: GetBoardMembersOptions): Promise<User[]> => {
  const { data } = await axiosInstance.get(`/boards/${boardId}/members`);
  return data;
};
