import { IsNotEmpty, IsString } from "class-validator";

export class CompleteProfileDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;
}
