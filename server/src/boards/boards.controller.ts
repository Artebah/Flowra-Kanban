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
  UseGuards,
} from "@nestjs/common";
import { CreateBoardDto } from "./dtos/create-board.dto";
import { BoardsService } from "./boards.service";
import { UserDecorator } from "src/auth/decorators/user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload.interface";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { LabelsService } from "src/labels/labels.service";
import { BoardAccessGuard } from "src/common/guards/board-access.guard";
import { UpdateLabelDto } from "src/labels/dtos/update-label.dto";
import { UpdateBoardDto } from "./dtos/update-board.dto";

@Controller("boards")
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly labelsService: LabelsService,
  ) {}

  @Post()
  create(
    @Body() createBoardDto: CreateBoardDto,
    @UserDecorator() user: JwtPayload,
  ) {
    return this.boardsService.create(createBoardDto, user.sub);
  }

  @Get("/:boardId")
  @UseGuards(BoardAccessGuard)
  getCurrentBoard(
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
    @UserDecorator() user: JwtPayload,
  ) {
    return this.boardsService.getCurrentBoard(boardId, user.sub);
  }

  @Delete("/:boardId")
  @HttpCode(204)
  @UseGuards(BoardAccessGuard)
  delete(@Param("boardId", new ParseUUIDPipe()) boardId: string) {
    return this.boardsService.delete(boardId);
  }

  @Patch("/:boardId")
  @UseGuards(BoardAccessGuard)
  update(
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update({ boardId, dto: updateBoardDto });
  }

  @Get()
  getAllMyBoards(@UserDecorator() user: JwtPayload) {
    return this.boardsService.getAllMyBoards(user.sub);
  }

  @Get("/:boardId/labels")
  @UseGuards(BoardAccessGuard)
  getAllLabels(@Param("boardId", new ParseUUIDPipe()) boardId: string) {
    return this.labelsService.getAll(boardId);
  }

  @Patch("/:boardId/labels/:labelId")
  updateLabel(
    @Body() updateLabelDto: UpdateLabelDto,
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
    @Param("labelId", new ParseUUIDPipe()) labelId: string,
  ) {
    return this.labelsService.update({ boardId, labelId, dto: updateLabelDto });
  }

  @Delete("/:boardId/labels/:labelId")
  deleteLabel(
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
    @Param("labelId", new ParseUUIDPipe()) labelId: string,
  ) {
    return this.labelsService.delete({ boardId, labelId });
  }
}
