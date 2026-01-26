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

  async getCurrentBoard(boardId: string): Promise<Board> {
    const board = await this.boardsRepository.findOne({
      where: {
        id: boardId,
      },
    });
    console.log(board);

    if (!board) {
      throw new NotFoundException();
    }

    return board;
  }

  async getAllMyBoards(userId: string): Promise<Board[]> {
    return Promise.resolve([]);
  }
}
