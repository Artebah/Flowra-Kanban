import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { RequestWithUser } from "../types/request-with-user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardMember } from "src/boards/entities/BoardMember.entity";
import { Repository } from "typeorm";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { BoardRole } from "src/boards/enums/BoardRole.enum";

@Injectable()
export class BoardRoleGuard implements CanActivate {
  constructor(
    @InjectRepository(BoardMember)
    private boardMemberRepository: Repository<BoardMember>,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const requiredRoles = this.reflector.getAllAndOverride<BoardRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const boardId = request.params.boardId;
    const userId = request.user.sub;

    const userBoardMember = await this.boardMemberRepository.findOne({
      where: {
        userId,
        boardId,
      },
    });

    if (!userBoardMember) {
      throw new NotFoundException("Board member not found");
    }

    return requiredRoles.includes(userBoardMember.role);
  }
}
