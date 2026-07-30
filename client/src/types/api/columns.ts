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

export interface CreateColumnOptions {
  dto: CreateColumnDto;
  boardId: string;
}

export interface UpdateColumnDto {
  title?: string;
  color?: string | null;
}

export interface UpdateColumnOrderDto {
  id: string;
  order: number;
}

export interface DeleteColumnOptions {
  boardId: string;
  columnId: string;
}

export type TBoardColumns = BoardColumn[];

export interface GetBoardColumnsOptions {
  boardId: string;
}

export interface PatchColumnOptions {
  boardId: string;
  columnId: string;
  dto: UpdateColumnDto;
}

export interface ReorderColumnsOptions {
  boardId: string;
  dto: UpdateColumnOrderDto[];
}
