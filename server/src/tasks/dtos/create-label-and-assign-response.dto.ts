import { Expose } from "class-transformer";
import { Label } from "src/labels/entities/Label.entity";

export class CreateLabelAndAssignResponse {
  @Expose()
  assignedLabels: Label[];

  @Expose()
  labels: Label[];
}
