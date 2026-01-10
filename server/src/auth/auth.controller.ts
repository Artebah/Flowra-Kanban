import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "src/common/dtos/register.dto";
import { UserDecorator } from "./decorators/user.decorator";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: "excludeAll" })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@UserDecorator() user: JwtPayload) {
    return user;
  }

  @Post("refresh")
  refresh() {
    return this.authService.refresh();
  }
}
