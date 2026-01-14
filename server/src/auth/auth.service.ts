import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthResponseDto } from "src/common/dtos/auth-response.dto";
import { RegisterDto } from "src/common/dtos/register.dto";
import { User } from "src/users/entities/User.entity";
import { UserService } from "src/users/users.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { ConfigService } from "@nestjs/config";
import { AuthConfig } from "src/config/app.config";
import { RefreshJwtResponseDto } from "src/common/dtos/refresh-jwt-response.dto";

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

    const accessToken = await this.generateAccessToken(createdUser);
    const refreshToken = await this.generateRefreshToken(createdUser);

    return new AuthResponseDto({
      user: createdUser,
      accessToken,
      refreshToken,
    });
  }

  async login(jwtPayload: JwtPayload): Promise<AuthResponseDto> {
    const user = await this.userService.findOneOrFail({
      email: jwtPayload.email,
    });

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return new AuthResponseDto({ user, accessToken, refreshToken });
  }

  async refresh(jwtPayload: JwtPayload): Promise<RefreshJwtResponseDto> {
    const user = await this.userService.findOneOrFail({
      email: jwtPayload.email,
    });

    const accessToken = await this.generateAccessToken(user);
    console.log(accessToken);
    return new RefreshJwtResponseDto({ accessToken });
  }

  private generateAccessToken(user: User) {
    return this.jwtService.signAsync<JwtPayload>({
      sub: user.id,
      email: user.email,
    });
  }

  private generateRefreshToken(user: User) {
    return this.jwtService.signAsync<JwtPayload>(
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
