import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateBoardDto } from "./dtos/create-board.dto";
import { BoardsService } from "./boards.service";
import { UserDecorator } from "src/auth/decorators/user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload.interface";

@Controller("boards")
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  getCurrentBoard(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.boardsService.getCurrentBoard(id);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  getAllMyBoards(@UserDecorator() user: JwtPayload) {
    return this.boardsService.getAllMyBoards(user.sub);
  }
}
