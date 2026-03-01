export interface BoardColumn {
  id: string;
  boardId: string;
  title: string;
  order: number;
  color?: string;
}

export interface CreateColumnDto {
  title: string;
}

export interface UpdateColumnDto {
  title?: string;
  color?: string | null;
}

export interface UpdateColumnOrderDto {
  id: string;
  order: number;
}

export type TBoardColumns = BoardColumn[];
