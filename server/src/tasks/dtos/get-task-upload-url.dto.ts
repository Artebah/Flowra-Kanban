import { IsEnum, IsOptional } from "class-validator";
import { BaseGetUploadUrlDto } from "src/common/dtos/base-get-upload-url.dto";

export enum TaskAssetPurpose {
  DESCRIPTION = "description",
  ATTACHMENT = "attachment",
  COVER = "cover",
}

export class GetTaskUploadUrlDto extends BaseGetUploadUrlDto {
  @IsOptional()
  @IsEnum(TaskAssetPurpose)
  purpose?: TaskAssetPurpose = TaskAssetPurpose.DESCRIPTION;
}
