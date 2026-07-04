import { IsNotEmpty, IsString } from "class-validator";

export class CreateLabelDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  color: string;
}
