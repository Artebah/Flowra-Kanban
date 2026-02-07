import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "src/common/dtos/register.dto";
import { UserDecorator } from "./decorators/user.decorator";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { LoginDto } from "src/common/dtos/login.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshAuthGuard } from "./guards/refresh-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Body() loginDto: LoginDto, @UserDecorator() jwtPayload: JwtPayload) {
    return this.authService.login(jwtPayload);
  }

  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  refresh(@UserDecorator() jwtPayload: JwtPayload) {
    return this.authService.refresh(jwtPayload);
  }
}
