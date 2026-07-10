import { Module } from "@nestjs/common";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "./entities/Board.entity";
import { BoardMember } from "./entities/BoardMember.entity";
import { LabelsModule } from "../labels/labels.module";

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [TypeOrmModule.forFeature([Board, BoardMember]), LabelsModule],
})
export class BoardsModule {}
