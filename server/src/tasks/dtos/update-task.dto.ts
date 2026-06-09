import { IsObject, IsOptional, IsString } from "class-validator";
import { JSONContent } from "src/common/types/json-content.interface";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  isCompleted?: string;

  @IsOptional()
  @IsObject()
  descriptionContent?: JSONContent;
}
