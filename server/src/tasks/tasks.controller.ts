import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { BoardAccessGuard } from "src/common/guards/board-access.guard";
import { TasksService } from "./tasks.service";
import { UserDecorator } from "src/auth/decorators/user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload.interface";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { Task } from "./entities/Task.entity";

@Controller("boards/:boardId/columns/:columnId/tasks")
@UseGuards(JwtAuthGuard, BoardAccessGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @UserDecorator() user: JwtPayload,
    @Param("columnId", new ParseUUIDPipe()) columnId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.create({
      authorId: user.sub,
      columnId,
      createTaskDto,
    });
  }
}
