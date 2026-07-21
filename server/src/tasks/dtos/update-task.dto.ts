import { IsBoolean, IsObject, IsOptional, IsString } from "class-validator";
import { JSONContent } from "src/common/types/json-content.interface";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsObject()
  descriptionContent?: JSONContent;

  @IsOptional()
  @IsString()
  dueDate?: string;
}
