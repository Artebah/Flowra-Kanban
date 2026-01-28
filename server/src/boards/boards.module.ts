import { Module } from "@nestjs/common";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "./entities/Board.entity";
import { BoardMember } from "./entities/BoardMember.entity";

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [TypeOrmModule.forFeature([Board, BoardMember])],
})
export class BoardsModule {}
