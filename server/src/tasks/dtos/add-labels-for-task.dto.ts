import { Type } from "class-transformer";
import { Label } from "../entities/Label.entity";
import { ArrayNotEmpty, IsArray, ValidateNested } from "class-validator";

export class AddLabelsForTaskDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Label)
  labels: Label[];
}
