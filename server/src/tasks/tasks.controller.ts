import { Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { BoardAccessGuard } from "src/common/guards/board-access.guard";

@Controller("boards/:boardId/columns/:columnId/tasks")
@UseGuards(JwtAuthGuard, BoardAccessGuard)
export class TasksController {
  @Post()
  create() {
    return "created";
  }
}
