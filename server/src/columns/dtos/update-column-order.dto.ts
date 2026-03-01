import { IsInt, IsUUID } from "class-validator";

export class UpdateColumnOrderDto {
  @IsUUID()
  id: string;

  @IsInt()
  order: number;
}
