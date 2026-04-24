import { IsString, IsNotEmpty, Matches } from "class-validator";

export class BaseGetUploadUrlDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(image\/(jpeg|png|webp|gif)|application\/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document|zip|x-zip-compressed)|text\/plain)$/,
    { message: "This file type is not allowed" },
  )
  fileType: string;
}
