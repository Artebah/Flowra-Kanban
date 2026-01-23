import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Board } from "./entities/Board.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBoardDto } from "./dtos/create-board.dto";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardsRepository: Repository<Board>,
  ) {}

  create({ title }: CreateBoardDto): Promise<Board> {
    const board = this.boardsRepository.create({ title });

    return this.boardsRepository.save(board);
  }

  async get(id: string): Promise<Board> {
    const board = await this.boardsRepository.findOne({
      where: {
        id,
      },
    });
    console.log(board);

    if (!board) {
      throw new NotFoundException();
    }

    return board;
  }
}
