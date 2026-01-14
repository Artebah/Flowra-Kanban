import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private UsersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.UsersService.validateUser({ username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
