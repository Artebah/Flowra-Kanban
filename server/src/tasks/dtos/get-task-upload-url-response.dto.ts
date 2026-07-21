import { Expose } from "class-transformer";

export class GetTaskUploadUrlResponseDto {
  @Expose()
  uploadUrl: string;

  @Expose()
  publicUrl: string;

  @Expose()
  fileKey: string;
}
