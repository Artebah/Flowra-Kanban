export interface IBoard {
  id: string;
  title: string;
  createdAt: string;
}

export type TBoardsList = IBoard[];

export interface CreateBoardDto {
  title: string;
}
