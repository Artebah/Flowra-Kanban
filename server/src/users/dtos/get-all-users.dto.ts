import { IsOptional, IsString } from "class-validator";

export class GetAllUsersDto {
  @IsString()
  @IsOptional()
  search?: string;
}
