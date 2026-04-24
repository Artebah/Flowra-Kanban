import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class StorageService {
  private readonly client: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    const accountId = this.configService.getOrThrow<string>("R2_ACCOUNT_ID");
    const accessKeyId =
      this.configService.getOrThrow<string>("R2_ACCESS_KEY_ID");
    const secretAccessKey = this.configService.getOrThrow<string>(
      "R2_SECRET_ACCESS_KEY",
    );

    this.bucketName = this.configService.getOrThrow<string>("R2_BUCKET_NAME");

    this.client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async getPresignedUrl(path: string, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: path,
      ContentType: contentType,
    });

    // temporary url for 1 hour
    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  }

  async deleteFile(path: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: path,
    });

    await this.client.send(command);
  }
}
