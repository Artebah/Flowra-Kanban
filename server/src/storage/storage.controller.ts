import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { StorageService } from "./storage.service";
import { GetUploadUrlDto } from "./dtos/get-upload-url.dto";
import { GetUploadUrlResponseDto } from "./dtos/get-upload-url-response.dto";

@Controller()
@UseGuards(JwtAuthGuard)
export class StorageController {
  constructor(
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
  ) {}

  @Post("upload-url")
  async getUploadUrl(@Body() dto: GetUploadUrlDto) {
    const fileKey = `${dto.folder}/${crypto.randomUUID()}-${dto.fileName}`;

    const uploadUrl = await this.storageService.getPresignedUrl(
      fileKey,
      dto.fileType,
    );

    const r2PublicUrl = this.configService.getOrThrow<string>("R2_PUBLIC_URL");
    const publicUrl = `${r2PublicUrl}/${fileKey}`;

    return plainToInstance(GetUploadUrlResponseDto, {
      uploadUrl,
      publicUrl,
      fileKey,
    });
  }
}
