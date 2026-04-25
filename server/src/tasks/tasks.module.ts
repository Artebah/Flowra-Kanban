import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardMember } from "src/boards/entities/BoardMember.entity";
import { Task } from "./entities/Task.entity";
import { BoardColumn } from "src/columns/entities/Column.entity";
import { StorageModule } from "src/storage/storage.module";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    TypeOrmModule.forFeature([BoardMember, Task, BoardColumn]),
    StorageModule,
  ],
})
export class TasksModule {}
