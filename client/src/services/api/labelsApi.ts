import type {
  CreateLabelOptions,
  ILabel,
  UpdateLabelOptions,
} from "@/types/api/labels";
import axiosInstance from "./axiosInstance";

export const getLabelsList = async (boardId: string): Promise<ILabel[]> => {
  const res = await axiosInstance.get(`/boards/${boardId}/labels`);
  return res.data;
};

export const updateLabel = async ({
  boardId,
  labelId,
  updateLabelDto,
}: UpdateLabelOptions): Promise<ILabel[]> => {
  const res = await axiosInstance.patch(
    `/boards/${boardId}/labels/${labelId}`,
    updateLabelDto
  );
  return res.data;
};

export const createLabelAndAssignToTask = async ({
  boardId,
  taskId,
  createLabelDto,
}: CreateLabelOptions): Promise<ILabel[]> => {
  const res = await axiosInstance.patch(
    `/boards/${boardId}/tasks/${taskId}/labels`,
    createLabelDto
  );
  return res.data;
};
