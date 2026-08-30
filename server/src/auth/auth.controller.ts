import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "src/common/dtos/register.dto";
import { UserDecorator } from "./decorators/user.decorator";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { LoginDto } from "src/common/dtos/login.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshAuthGuard } from "./guards/refresh-auth.guard";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { GoogleUserPayload } from "./interfaces/google-payload.interface";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

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

  @UseGuards(GoogleAuthGuard)
  @Get("google")
  googleAuth() {}

  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  googleAuthCallback(
    @UserDecorator() googleUser: GoogleUserPayload,
    //@Res() res: Response,
  ) {
    console.log(googleUser);
    //  const { accessToken, refreshToken } =
    //    await this.authService.validateGoogleUser(googleUser);

    //  const clientUrl = this.configService.getOrThrow<string>("CLIENT_URL");

    //  res.redirect(
    //    HttpStatus.TEMPORARY_REDIRECT,
    //    `${clientUrl}/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`,
    //  );
  }
}
