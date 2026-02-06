import { Body, Controller, Post } from "@nestjs/common";
import { CreateColumnDto } from "./dtos/create-column.dto";
import { ColumnsService } from "./columns.service";

@Controller("columns")
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(createColumnDto);
  }
}
