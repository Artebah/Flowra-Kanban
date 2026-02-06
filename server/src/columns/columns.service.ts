import { Injectable } from "@nestjs/common";
import { CreateColumnDto } from "./dtos/create-column.dto";
import { Repository } from "typeorm";
import { BoardColumn } from "./entities/Column.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly columnsRepository: Repository<BoardColumn>,
  ) {}

  async create({ boardId, title }: CreateColumnDto): Promise<BoardColumn> {
    const newColumn = this.columnsRepository.create({
      boardId,
      title,
    });

    await this.columnsRepository.save(newColumn);

    return newColumn;
  }
}
