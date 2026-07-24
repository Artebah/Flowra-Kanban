import { Expose } from "class-transformer";

export class GetUploadUrlResponseDto {
  @Expose()
  uploadUrl: string;

  @Expose()
  publicUrl: string;

  @Expose()
  fileKey: string;
}
