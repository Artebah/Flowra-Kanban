import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CompleteProfileDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
