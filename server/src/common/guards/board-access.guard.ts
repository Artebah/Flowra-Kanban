import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardMember } from "src/boards/entities/BoardMember.entity";
import { Repository } from "typeorm";
import { RequestWithUser } from "../types/request-with-user.interface";

@Injectable()
export class BoardAccessGuard implements CanActivate {
  constructor(
    @InjectRepository(BoardMember)
    private boardMemberRepository: Repository<BoardMember>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const userId = request.user?.sub;
    const boardId = request.params.boardId;

    if (!boardId) {
      throw new Error('BoardAccessGuard requires ":boardId" param in route');
    }

    const member = await this.boardMemberRepository.findOne({
      where: {
        userId,
        boardId,
      },
    });

    if (!member) {
      throw new ForbiddenException("You don't have access to the board");
    }

    return true;
  }
}
