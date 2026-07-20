import type {
  CreateLabelAndAssignToTaskOptions,
  DeleteLabelOptions,
  GetAssignedLabelsOptions,
  ILabel,
  UpdateLabelOptions,
  UpdateLabelResponse,
} from "@/types/api/labels";
import axiosInstance from "./axiosInstance";

export const getLabelsList = async (boardId: string): Promise<ILabel[]> => {
  const res = await axiosInstance.get(`/boards/${boardId}/labels`);
  return res.data;
};

export const updateLabel = async ({
  boardId,
  labelId,
  taskId,
  updateLabelDto,
}: UpdateLabelOptions): Promise<UpdateLabelResponse> => {
  const res = await axiosInstance.patch(
    `/boards/${boardId}/tasks/${taskId}/labels/${labelId}`,
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

export const getAssignedLabels = async ({
  boardId,
  taskId,
}: GetAssignedLabelsOptions): Promise<ILabel[]> => {
  const res = await axiosInstance.get(
    `/boards/${boardId}/tasks/${taskId}/labels/assigned`
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
