import { ArrayNotEmpty, IsArray, IsUUID } from "class-validator";

export class AddLabelsForTaskDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID("4", { each: true })
  labelIds: string[];
}
