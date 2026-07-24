import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { User } from "./entities/User.entity";
import { UsersService } from "./users.service";
import { UserDecorator } from "../auth/decorators/user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload.interface";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CompleteProfileDto } from "./dtos/complete-profile.dto";

@Controller("users")
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/me")
  @UseGuards(JwtAuthGuard)
  async me(@UserDecorator() user: JwtPayload): Promise<User> {
    return this.usersService.findOneOrFail({ email: user.email });
  }

  @Patch("/:userId/complete-profile")
  @UseGuards(JwtAuthGuard)
  async completeProfile(
    @Body() completeProfileDto: CompleteProfileDto,
    @Param("userId", new ParseUUIDPipe()) userId: string,
  ) {
    return this.usersService.completeProfile({
      userId,
      dto: completeProfileDto,
    });
  }
}
