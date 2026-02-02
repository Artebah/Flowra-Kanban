import { Module } from "@nestjs/common";
import { ColumnsController } from "./columns.controller";
import { ColumnsService } from "./columns.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardColumn } from "./entities/Column.entity";

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService],
  imports: [TypeOrmModule.forFeature([BoardColumn])],
})
export class ColumnsModule {}
