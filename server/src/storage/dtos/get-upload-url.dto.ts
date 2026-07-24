import { IsString, IsNotEmpty, Matches } from "class-validator";
import { BaseGetUploadUrlDto } from "src/common/dtos/base-get-upload-url.dto";

export class GetUploadUrlDto extends BaseGetUploadUrlDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9/_-]+$/, {
    message: "folder must contain only alphanumeric characters, slashes, underscores, or hyphens",
  })
  folder: string;
}
