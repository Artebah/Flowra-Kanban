export interface ILabel {
  id: string;
  title: string;
  color: string;
}

export interface UpdateLabelDto {
  title?: string | null;
  color?: string;
}

export interface UpdateLabelOptions {
  boardId: string;
  labelId: string;
  taskId: string;
  updateLabelDto: UpdateLabelDto;
}

export interface CreateLabelDto {
  title: string | null;
  color: string;
}

export interface CreateLabelAndAssignToTaskOptions {
  boardId: string;
  taskId: string;
  createLabelDto: CreateLabelDto;
}

export interface DeleteLabelOptions {
  boardId: string;
  labelId: string;
  taskId: string;
}

export interface GetAssignedLabelsOptions {
  boardId: string;
  taskId: string;
}

export interface UpdateLabelResponse {
  labels: ILabel[];
  assignedLabels: ILabel[];
}
