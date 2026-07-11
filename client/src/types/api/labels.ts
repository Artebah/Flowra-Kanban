export interface ILabel {
  id: string;
  title: string;
  color: string;
}

export interface UpdateLabelDto {
  title?: string;
  color?: string;
}

export interface UpdateLabelOptions {
  boardId: string;
  labelId: string;
  updateLabelDto: UpdateLabelDto;
}

export interface CreateLabelDto {
  title: string;
  color: string;
}

export interface CreateLabelAndAssignToTaskOptions {
  boardId: string;
  taskId: string;
  createLabelDto: CreateLabelDto;
}
