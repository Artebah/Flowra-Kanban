import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLabelDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  color: string;
}
