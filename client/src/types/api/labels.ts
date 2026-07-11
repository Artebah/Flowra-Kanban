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
