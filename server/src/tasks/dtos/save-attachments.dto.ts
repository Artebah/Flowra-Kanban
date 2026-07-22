import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";

class AttachmentItemDto {
  @IsString()
  url: string;

  @IsString()
  fileName: string;
}

export class SaveAttachmentsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentItemDto)
  attachments: AttachmentItemDto[];
}
