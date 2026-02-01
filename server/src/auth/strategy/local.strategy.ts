import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { isEmail } from "class-validator";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      usernameField: "emailOrUsername",
      passwordField: "password",
    });
  }

  async validate(emailOrUsername: string, password: string): Promise<any> {
    const isEmailValue = isEmail(emailOrUsername);

    const loginDto = isEmailValue
      ? { email: emailOrUsername, password }
      : { username: emailOrUsername, password };

    const user = await this.usersService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
