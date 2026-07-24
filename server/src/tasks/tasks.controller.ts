import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  SerializeOptions,
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
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { CreateLabelDto } from "src/labels/dtos/create-label.dto";
import { LabelsService } from "src/labels/labels.service";
import { AssignLabelsDto } from "./dtos/assign-labels.dto";
import { AssignMembersDto } from "./dtos/assign-members.dto";
import { SaveAttachmentsDto } from "./dtos/save-attachments.dto";
import { RemoveAttachmentDto } from "./dtos/remove-attachment.dto";

@Controller()
@UseGuards(JwtAuthGuard, BoardAccessGuard)
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly labelsService: LabelsService,
  ) {}

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
  @SerializeOptions({ strategy: "exposeAll" })
  getOne(
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
    @Param("taskId", new ParseUUIDPipe()) taskId: string,
  ) {
    return this.tasksService.getOne({ boardId, taskId });
  }

  @Patch("boards/:boardId/tasks/:taskId")
  @SerializeOptions({ strategy: "exposeAll" })
  updateTask(
    @Param("taskId", new ParseUUIDPipe()) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask({
      taskId,
      updateTaskDto,
    });
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

  @Delete("boards/:boardId/tasks/:taskId")
  @HttpCode(204)
  deleteTask(@Param("taskId", new ParseUUIDPipe()) taskId: string) {
    return this.tasksService.deleteTask(taskId);
  }

  @Post("boards/:boardId/tasks/:taskId/labels")
  createLabelAndAssignToTask(
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
    @Param("taskId", new ParseUUIDPipe()) taskId: string,
    @Body() createLabelDto: CreateLabelDto,
  ) {
    return this.tasksService.createLabelAndAssignToTask({
      boardId,
      taskId,
      dto: createLabelDto,
    });
  }

  @Get("boards/:boardId/tasks/:taskId/labels/assigned")
  getAssignedLabels(
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
    @Param("taskId", new ParseUUIDPipe()) taskId: string,
  ) {
    return this.labelsService.getAssignedLabelsToTask({ boardId, taskId });
  }

  @Post("boards/:boardId/tasks/:taskId/labels/assign")
  assignLabels(
    @Body() dto: AssignLabelsDto,
    @Param("taskId", new ParseUUIDPipe()) taskId: string,
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
  ) {
    return this.tasksService.assignLabels({ dto, taskId, boardId });
  }

  @Get("boards/:boardId/tasks/:taskId/members/assigned")
  getAssignedMembers(@Param("taskId", new ParseUUIDPipe()) taskId: string) {
    return this.tasksService.getAssignedMembers({ taskId });
  }

  @Post("boards/:boardId/tasks/:taskId/members/assign")
  assignMembers(
    @Body() dto: AssignMembersDto,
    @Param("taskId", new ParseUUIDPipe()) taskId: string,
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
  ) {
    return this.tasksService.assignMembers({ dto, taskId, boardId });
  }

  @Post("boards/:boardId/tasks/:taskId/attachments/save")
  saveAttachments(
    @Param("taskId", new ParseUUIDPipe()) taskId: string,
    @Body() saveAttachmentsDto: SaveAttachmentsDto,
  ) {
    return this.tasksService.saveAttachments({
      taskId,
      dto: saveAttachmentsDto,
    });
  }

  @Get("boards/:boardId/tasks/:taskId/attachments")
  getAttachments(@Param("taskId", new ParseUUIDPipe()) taskId: string) {
    return this.tasksService.getAttachments(taskId);
  }

  @Delete("boards/:boardId/tasks/:taskId/attachments")
  @HttpCode(204)
  removeAttachment(
    @Param("taskId", new ParseUUIDPipe()) taskId: string,
    @Body() removeAttachmentDto: RemoveAttachmentDto,
  ) {
    return this.tasksService.removeAttachment({
      taskId,
      dto: removeAttachmentDto,
    });
  }
}
