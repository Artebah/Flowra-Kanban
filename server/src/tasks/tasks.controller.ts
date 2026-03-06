import {
  Body,
  Controller,
  Get,
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

@Controller()
@UseGuards(JwtAuthGuard, BoardAccessGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post("boards/:boardId/columns/:columnId/tasks")
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

  @Get("boards/:boardId/tasks")
  getAll(@Param("boardId", new ParseUUIDPipe()) boardId: string) {
    return this.tasksService.getAll({ boardId });
  }
}
