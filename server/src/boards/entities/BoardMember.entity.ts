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
import { Expose } from "class-transformer";

@Entity("board-members")
export class BoardMember extends BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Expose()
  @Column({
    type: "enum",
    enum: BoardRole,
    default: BoardRole.MEMBER,
  })
  role: BoardRole;

  @Expose()
  @Column()
  userId: string;

  @Expose()
  @Column()
  boardId: string;

  @Expose()
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
