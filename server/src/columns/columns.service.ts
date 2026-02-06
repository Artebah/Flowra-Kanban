import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateColumnDto } from "./dtos/create-column.dto";
import { Repository } from "typeorm";
import { BoardColumn } from "./entities/Column.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/boards/entities/Board.entity";

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly columnsRepository: Repository<BoardColumn>,
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  async create({ boardId, title }: CreateColumnDto): Promise<BoardColumn> {
    const boardExists = await this.boardsRepository.exists({
      where: { id: boardId },
    });

    if (!boardExists) {
      throw new NotFoundException(`Board not found`);
    }

    const columnsCount = await this.columnsRepository.count({
      where: { boardId },
    });

    const newColumn = this.columnsRepository.create({
      boardId,
      title,
      order: columnsCount + 1,
    });

    const savedColumn = await this.columnsRepository.save(newColumn);

    return savedColumn;
  }
}
