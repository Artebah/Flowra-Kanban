import { BaseEntity } from "src/common/entities/base.entity";
import { User } from "src/users/entities/User.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Board } from "./Board.entity";
import { BoardRole } from "../enums/BoardRole.enum";

@Entity("board-members")
export class BoardMember extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: BoardRole,
    default: BoardRole.MEMBER,
  })
  role: BoardRole;

  @Column()
  userId: string;

  @Column()
  boardId: string;

  @ManyToOne(() => User, (user) => user.boardMembers, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Board, (board) => board.boardMembers, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "boardId" })
  board: Board;
}
