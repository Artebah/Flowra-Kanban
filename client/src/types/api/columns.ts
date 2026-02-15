export interface BoardColumn {
  id: string;
  boardId: string;
  title: string;
  order: number;
  color?: string;
}

export interface UpdateColumnDto {
  title?: string;
  color?: string | null;
}

export type TBoardColumns = BoardColumn[];
