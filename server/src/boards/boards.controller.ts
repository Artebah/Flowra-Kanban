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
  get(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.boardsService.get(id);
  }
}
