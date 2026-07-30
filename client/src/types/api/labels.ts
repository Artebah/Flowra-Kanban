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
  dto: UpdateLabelDto;
}

export interface CreateLabelDto {
  title: string | null;
  color: string;
}

export interface CreateLabelAndAssignToTaskOptions {
  boardId: string;
  taskId: string;
  dto: CreateLabelDto;
}

export interface CreateLabelAndAssignToTaskResponse {
  labels: ILabel[];
  assignedLabels: ILabel[];
}

export interface DeleteLabelOptions {
  boardId: string;
  labelId: string;
  taskId: string;
}

export interface DeleteLabelResponse {
  labels: ILabel[];
  assignedLabels: ILabel[];
}

export interface GetAssignedLabelsOptions {
  boardId: string;
  taskId: string;
}

export interface GetLabelsListOptions {
  boardId: string;
}

export interface UpdateLabelResponse {
  labels: ILabel[];
  assignedLabels: ILabel[];
}
