import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateColumnDto {
  @IsUUID()
  @IsNotEmpty()
  boardId: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
