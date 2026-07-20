import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { Board } from "./entities/Board.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBoardDto } from "./dtos/create-board.dto";
import { BoardMember } from "./entities/BoardMember.entity";
import { BoardRole } from "./enums/BoardRole.enum";
import { GetCurrentBoardResponseDto } from "./dtos/get-current-board-response.dto";
import { plainToInstance } from "class-transformer";
import { UpdateBoardDto } from "./dtos/update-board.dto";

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

  async getCurrentBoard(
    boardId: string,
    userId: string,
  ): Promise<GetCurrentBoardResponseDto> {
    const membership = await this.boardMembersRepository.findOne({
      where: {
        boardId,
        userId,
      },
      relations: ["board"],
    });

    if (!membership) {
      throw new ForbiddenException("You don't have access to the board");
    }

    return plainToInstance(GetCurrentBoardResponseDto, {
      board: membership.board,
      role: membership.role,
    });
  }

  async getAllMyBoards(userId: string): Promise<Board[]> {
    const memberships = await this.boardMembersRepository.find({
      where: { userId },
      relations: ["board"],
    });

    const allMyBoards = memberships.map((membership) => membership.board);

    return allMyBoards;
  }

  delete(boardId: string) {
    return this.boardsRepository.delete(boardId);
  }

  async update({ boardId, dto }: { boardId: string; dto: UpdateBoardDto }) {
    const board = await this.boardsRepository.findOne({
      where: { id: boardId },
    });

    if (!board) throw new NotFoundException("The board not found");

    Object.assign(board, dto);

    return this.boardsRepository.save(board);
  }

  async getAllBoardMembers({ boardId }: { boardId: string }) {
    const board = await this.boardsRepository.findOne({
      where: { id: boardId },
    });

    if (!board) throw new NotFoundException("The board not found");

    return board.boardMembers;
  }
}
