import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthConfig, GlobalTypedConfig } from "src/config/app.config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
import { RefreshJwtStrategy } from "./strategy/refresh-jwt.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshJwtStrategy, LocalStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: GlobalTypedConfig) => ({
        secret: config.get<AuthConfig>("auth")?.secret,
        expiresIn: config.get<AuthConfig>("auth")?.expiresIn as `${number}`,
      }),
    }),
  ],
})
export class AuthModule {}
