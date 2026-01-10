import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "src/common/dtos/register.dto";
import { UserDecorator } from "./decorators/user.decorator";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto } from "src/common/dtos/login.dto";

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
  login(
    @Body(new ValidationPipe()) loginDto: LoginDto,
    @UserDecorator() jwtPayload: JwtPayload,
  ) {
    return this.authService.login(jwtPayload);
  }

  @UseGuards(AuthGuard("refresh-jwt"))
  @Post("refresh")
  refresh(@UserDecorator() jwtPayload: JwtPayload) {
    return this.authService.refresh(jwtPayload);
  }
}
