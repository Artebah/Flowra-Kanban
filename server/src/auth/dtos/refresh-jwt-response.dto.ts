import { Expose } from "class-transformer";

export class RefreshJwtResponseDto {
  constructor(partial: Partial<RefreshJwtResponseDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  accessToken: string;
}
