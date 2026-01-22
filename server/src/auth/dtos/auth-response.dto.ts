import { Expose, Type } from "class-transformer";
import { User } from "src/users/entities/User.entity";

export class AuthResponseDto {
  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  @Type(() => User)
  user: User;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
