import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
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
import { UpdateTaskOrderDto } from "./dtos/update-task-order.dto";

@Controller()
@UseGuards(JwtAuthGuard, BoardAccessGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post("boards/:boardId/columns/:columnId/tasks")
  create(
    @UserDecorator() user: JwtPayload,
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
    @Param("columnId", new ParseUUIDPipe()) columnId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.create({
      boardId,
      authorId: user.sub,
      columnId,
      createTaskDto,
    });
  }

  @Get("boards/:boardId/tasks")
  getAll(@Param("boardId", new ParseUUIDPipe()) boardId: string) {
    return this.tasksService.getAll({ boardId });
  }

  @Get("boards/:boardId/tasks/:taskId")
  getOne(
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
    @Param("taskId", new ParseUUIDPipe()) taskId: string,
  ) {
    return this.tasksService.getOne({ boardId, taskId });
  }

  @Patch("boards/:boardId/tasks/:taskId/reorder")
  @HttpCode(204)
  updateTaskOrder(
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
    @Param("taskId", new ParseUUIDPipe()) taskId: string,
    @Body() updateTaskOrderDto: UpdateTaskOrderDto,
  ) {
    return this.tasksService.updateTaskOrder({
      boardId,
      taskId,
      updateTaskOrderDto,
    });
  }
}
