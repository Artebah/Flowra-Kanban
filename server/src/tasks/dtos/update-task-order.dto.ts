import { IsNumber, IsUUID } from "class-validator";

export class UpdateTaskOrderDto {
  @IsUUID()
  columnId: string;

  @IsNumber(
    { maxDecimalPlaces: 15, allowInfinity: false, allowNaN: false },
    { message: "order must be a valid number" },
  )
  order: number;
}
