import { IsNotEmpty, IsString } from "class-validator";

export class RemoveAttachmentDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}
