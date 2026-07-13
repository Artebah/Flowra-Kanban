import { Type } from "class-transformer";
import { IsArray, IsString } from "class-validator";

export class AssignLabelsDto {
  @IsArray()
  @IsString({ each: true })
  labelsIds: string[];
}
