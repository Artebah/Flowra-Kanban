import { Module } from "@nestjs/common";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "./entities/Board.entity";

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [TypeOrmModule.forFeature([Board])],
})
export class BoardsModule {}
