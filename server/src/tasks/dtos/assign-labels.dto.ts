import { IsArray, IsString } from "class-validator";

export class AssignLabelsDto {
  @IsArray()
  @IsString({ each: true })
  labelsIds: string[];
}
