export interface BoardColumn {
  id: string;
  boardId: string;
  title: string;
  order: number;
  color?: string;
}

export type TBoardColumns = BoardColumn[];
