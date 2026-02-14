import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateColumnDto } from "./dtos/create-column.dto";
import { ColumnsService } from "./columns.service";
import { BoardAccessGuard } from "src/common/guards/board-access.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UpdateColumnDto } from "./dtos/update.column.dto";

@Controller("boards/:boardId/columns")
@UseGuards(JwtAuthGuard, BoardAccessGuard)
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  create(
    @Body() createColumnDto: CreateColumnDto,
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
  ) {
    return this.columnsService.create(createColumnDto.title, boardId);
  }

  @Get()
  getAll(@Param("boardId", new ParseUUIDPipe()) boardId: string) {
    return this.columnsService.getAll(boardId);
  }

  @Patch("/:columnId")
  update(
    @Body() updateColumnDto: UpdateColumnDto,
    @Param("boardId", new ParseUUIDPipe()) boardId: string,
    @Param("columnId", new ParseUUIDPipe()) columnId: string,
  ) {
    return this.columnsService.update(updateColumnDto, boardId, columnId);
  }
}
