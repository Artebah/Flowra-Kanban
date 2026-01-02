import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./entities/User.entity";
import { UserService } from "./user.service";
import { UserDecorator } from "../auth/decorators/user.decorator";
import { UserPayload } from "../auth/interfaces/user-payload.interface";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/me")
  @UseGuards(AuthGuard("jwt"))
  async me(@UserDecorator() user: UserPayload): Promise<User> {
    return this.userService.findOneOrFail({ email: user.email });
  }
}
