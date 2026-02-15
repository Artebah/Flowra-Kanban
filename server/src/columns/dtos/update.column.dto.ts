import { IsOptional, IsString } from "class-validator";

export class UpdateColumnDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  color?: string;
}
