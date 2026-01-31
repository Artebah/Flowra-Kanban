import { Expose } from "class-transformer";
import { Board } from "../entities/Board.entity";
import { BoardRole } from "../enums/BoardRole.enum";

export class GetCurrentBoardResponseDto {
  @Expose()
  board: Board;

  @Expose()
  role: BoardRole;
}
