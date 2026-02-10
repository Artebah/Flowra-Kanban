import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateBoardDto } from "./dtos/create-board.dto";
import { BoardsService } from "./boards.service";
import { UserDecorator } from "src/auth/decorators/user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload.interface";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("boards")
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(
    @Body() createBoardDto: CreateBoardDto,
    @UserDecorator() user: JwtPayload,
  ) {
    return this.boardsService.create(createBoardDto, user.sub);
  }

  @Get("/:boardId")
  getCurrentBoard(
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
    @UserDecorator() user: JwtPayload,
  ) {
    return this.boardsService.getCurrentBoard(boardId, user.sub);
  }

  @Get()
  getAllMyBoards(@UserDecorator() user: JwtPayload) {
    return this.boardsService.getAllMyBoards(user.sub);
  }
}
