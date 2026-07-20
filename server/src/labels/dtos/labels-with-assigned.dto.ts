import { Expose, Type } from "class-transformer";
import { Label } from "../entities/Label.entity";

export class LabelsWithAssignedDto {
  @Expose()
  @Type(() => Label)
  labels: Label[];

  @Expose()
  @Type(() => Label)
  assignedLabels: Label[];
}
