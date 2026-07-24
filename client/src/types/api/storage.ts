export interface GetUploadUrlDto {
  folder: string;
  fileName: string;
  fileType: string;
}

export interface GetUploadUrlOptions {
  dto: GetUploadUrlDto;
}

export interface GetUploadUrlResponse {
  uploadUrl: string;
  publicUrl: string;
  fileKey: string;
}
