import { IsOptional, IsString } from "class-validator";

export class UpdateLabelDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  color: string;
}
