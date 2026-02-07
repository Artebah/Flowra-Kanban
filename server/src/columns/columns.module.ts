import { Module } from "@nestjs/common";
import { ColumnsController } from "./columns.controller";
import { ColumnsService } from "./columns.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardColumn } from "./entities/Column.entity";
import { Board } from "src/boards/entities/Board.entity";
import { BoardMember } from "src/boards/entities/BoardMember.entity";

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService],
  imports: [TypeOrmModule.forFeature([BoardColumn, Board, BoardMember])],
})
export class ColumnsModule {}
