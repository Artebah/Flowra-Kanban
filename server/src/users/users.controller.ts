import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "./entities/User.entity";
import { UsersService } from "./users.service";
import { UserDecorator } from "../auth/decorators/user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload.interface";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("users")
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/me")
  @UseGuards(JwtAuthGuard)
  async me(@UserDecorator() user: JwtPayload): Promise<User> {
    return this.usersService.findOneOrFail({ email: user.email });
  }
}
