import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
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

  @ValidateIf((object, value) => value !== null) // Validate as string only if value IS NOT null
  @IsOptional()
  @IsString()
  dueDate?: string | null;
}
