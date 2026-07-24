import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardMember } from "src/boards/entities/BoardMember.entity";
import { Task } from "./entities/Task.entity";
import { TaskAttachment } from "./entities/TaskAttachment.entity";
import { BoardColumn } from "src/columns/entities/Column.entity";
import { LabelsModule } from "src/labels/labels.module";
import { Label } from "src/labels/entities/Label.entity";
import { User } from "src/users/entities/User.entity";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    TypeOrmModule.forFeature([BoardMember, Task, BoardColumn, Label, User, TaskAttachment]),
    LabelsModule,
  ],
})
export class TasksModule {}
