import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthResponseDto } from "src/auth/dtos/auth-response.dto";
import { RegisterDto } from "src/common/dtos/register.dto";
import { User } from "src/users/entities/User.entity";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { ConfigService } from "@nestjs/config";
import { AuthConfig } from "src/config/app.config";
import { RefreshJwtResponseDto } from "src/auth/dtos/refresh-jwt-response.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GoogleUserPayload } from "./interfaces/google-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly UsersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.UsersService.findOne({
      email: registerDto.email,
    });

    if (existingUser) {
      throw new ConflictException("User already exists");
    }

    const createdUser = await this.UsersService.create(registerDto);

    const accessToken = await this.generateAccessToken(createdUser);
    const refreshToken = await this.generateRefreshToken(createdUser);

    return new AuthResponseDto({
      user: createdUser,
      accessToken,
      refreshToken,
    });
  }

  async validateGoogleUser(
    payload: GoogleUserPayload,
  ): Promise<AuthResponseDto> {
    let user = await this.UsersService.findOne({ googleId: payload.googleId });

    if (!user) {
      user = await this.UsersService.findOne({ email: payload.email });

      if (user) {
        user = await this.UsersService.update(user.id, {
          googleId: payload.googleId,
          avatar: user.avatar ?? payload.avatar,
        });
      } else {
        user = await this.UsersService.createOAuthUser({
          email: payload.email,
          googleId: payload.googleId,
          avatar: payload.avatar,
          isProfileCompleted: false,
        });
      }
    }

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return new AuthResponseDto({ user, accessToken, refreshToken });
  }

  async login(jwtPayload: JwtPayload): Promise<AuthResponseDto> {
    const user = await this.UsersService.findOneOrFail({
      email: jwtPayload.email,
    });

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return new AuthResponseDto({ user, accessToken, refreshToken });
  }

  async refresh(jwtPayload: JwtPayload): Promise<RefreshJwtResponseDto> {
    const user = await this.UsersService.findOneOrFail({
      email: jwtPayload.email,
    });

    const accessToken = await this.generateAccessToken(user);

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
