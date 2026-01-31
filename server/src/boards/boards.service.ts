import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Board } from "./entities/Board.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBoardDto } from "./dtos/create-board.dto";
import { BoardMember } from "./entities/BoardMember.entity";
import { BoardRole } from "./enums/BoardRole.enum";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardsRepository: Repository<Board>,
    @InjectRepository(BoardMember)
    private boardMembersRepository: Repository<BoardMember>,
  ) {}

  create({ title }: CreateBoardDto, userId: string): Promise<Board> {
    return this.boardsRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const board = transactionalEntityManager.create(Board, { title });

        await transactionalEntityManager.save(board);

        const boardMember = transactionalEntityManager.create(BoardMember, {
          userId,
          boardId: board.id,
          role: BoardRole.OWNER,
        });

        await transactionalEntityManager.save(boardMember);

        return board;
      },
    );
  }

  async getCurrentBoard(boardId: string): Promise<Board> {
    const board = await this.boardsRepository.findOne({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      throw new NotFoundException();
    }

    return board;
  }

  async getAllMyBoards(userId: string): Promise<Board[]> {
    const memberships = await this.boardMembersRepository.find({
      where: { userId },
      relations: ["board"],
    });

    const allMyBoards = memberships.map((membership) => membership.board);

    return allMyBoards;
  }
}
