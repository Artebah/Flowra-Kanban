import type {
  CreateBoardDto,
  IBoard,
  TBoardsList,
} from "../../types/api/boards";
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
