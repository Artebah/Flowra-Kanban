import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  globalConfigValidationSchema,
  GlobalTypedConfig,
} from "./config/app.config";
import { typeormConfig } from "./config/typeorm.config";
import { AuthModule } from "./auth/auth.module";
import { User } from "./users/entities/User.entity";
import { authConfig } from "./config/auth.config";
import { UserModule } from "./users/users.module";
import { BoardsModule } from "./boards/boards.module";
import { Board } from "./boards/entities/Board.entity";
import { BoardMember } from "./boards/entities/BoardMember.entity";
import { ColumnsModule } from "./columns/columns.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig, authConfig],
      validationSchema: globalConfigValidationSchema,
      validationOptions: { abortEarly: true },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: GlobalTypedConfig) => ({
        ...(await configService.get("typeorm")),
        entities: [User, Board, BoardMember],
      }),
    }),
    AuthModule,
    UserModule,
    BoardsModule,
    ColumnsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
