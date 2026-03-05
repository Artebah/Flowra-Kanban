import { Expose } from "class-transformer";

export class CreateTaskDto {
  @Expose()
  title: string;
}
