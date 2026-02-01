export interface IBoard {
  id: string;
  title: string;
  createdAt: string;
}

export type TBoardsList = IBoard[];

export interface CreateBoardDto {
  title: string;
}

export enum BoardRole {
  MEMBER = "member",
  OWNER = "owner",
}

export interface BoardByIdResponse {
  board: IBoard;
  role: BoardRole;
}
