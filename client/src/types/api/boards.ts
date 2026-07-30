export interface IBoard {
  id: string;
  title: string;
  createdAt: string;
  coverUrl?: string;
  coverBgColor: string;
}

export type TBoardsList = IBoard[];

export interface CreateBoardDto {
  title: string;
  coverUrl?: string;
  coverBgColor: string;
}

export enum BoardRole {
  MEMBER = "member",
  OWNER = "owner",
}

export interface BoardByIdResponse {
  board: IBoard;
  role: BoardRole;
}

export interface UpdateBoardDto {
  title: string;
}

export interface UpdateBoardOptions {
  dto: UpdateBoardDto;
  boardId: string;
}

export interface GetBoardMembersOptions {
  boardId: string;
}

export interface CreateBoardOptions {
  dto: CreateBoardDto;
}

export interface GetBoardByIdOptions {
  boardId: string;
}

export interface DeleteBoardOptions {
  boardId: string;
}
