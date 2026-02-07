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
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createBoardDto: CreateBoardDto,
    @UserDecorator() user: JwtPayload,
  ) {
    return this.boardsService.create(createBoardDto, user.sub);
  }

  @Get("/:boardId")
  @UseGuards(JwtAuthGuard)
  getCurrentBoard(
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
    @UserDecorator() user: JwtPayload,
  ) {
    return this.boardsService.getCurrentBoard(boardId, user.sub);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllMyBoards(@UserDecorator() user: JwtPayload) {
    return this.boardsService.getAllMyBoards(user.sub);
  }
}
