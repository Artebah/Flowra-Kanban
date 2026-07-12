import type {
  CreateLabelAndAssignToTaskOptions,
  DeleteLabelOptions,
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
}: CreateLabelAndAssignToTaskOptions): Promise<ILabel[]> => {
  const res = await axiosInstance.post(
    `/boards/${boardId}/tasks/${taskId}/labels`,
    createLabelDto
  );
  return res.data;
};

export const deleteLabel = async ({
  boardId,
  labelId,
}: DeleteLabelOptions): Promise<ILabel[]> => {
  const res = await axiosInstance.delete(
    `/boards/${boardId}/labels/${labelId}`
  );
  return res.data;
};
