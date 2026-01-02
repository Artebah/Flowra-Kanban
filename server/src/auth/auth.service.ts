import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthResponseDto } from "src/common/dtos/auth-response.dto";
import { LoginDto } from "src/common/dtos/login.dto";
import { RegisterDto } from "src/common/dtos/register.dto";
import { User } from "src/user/entities/User.entity";
import { UserService } from "src/user/user.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { ConfigService } from "@nestjs/config";
import { AuthConfig } from "src/config/app.config";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.userService.findOne({
      email: registerDto.email,
      username: registerDto.username,
    });

    if (existingUser) {
      throw new ConflictException("User already exists");
    }

    const createdUser = await this.userService.create(registerDto);

    const accessToken = this.generateAccessToken(createdUser);
    const refreshToken = this.generateRefreshToken(createdUser);

    return new AuthResponseDto({
      user: createdUser,
      accessToken,
      refreshToken,
    });
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userService.validateUser(loginDto);
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return new AuthResponseDto({ user, accessToken, refreshToken });
  }

  private generateAccessToken(user: User) {
    return this.jwtService.sign<JwtPayload>({
      sub: user.id,
      email: user.email,
    });
  }

  private generateRefreshToken(user: User) {
    return this.jwtService.sign<JwtPayload>(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.configService.get<AuthConfig>("auth")?.refreshSecret,
        expiresIn: this.configService.get<AuthConfig>("auth")
          ?.refreshExpiresIn as `${number}`,
      },
    );
  }
}
