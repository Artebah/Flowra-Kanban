import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { BoardRole } from "../enums/BoardRole.enum";

export class AddBoardMemberDto {
  @IsEnum(BoardRole)
  @IsNotEmpty()
  role: BoardRole;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
