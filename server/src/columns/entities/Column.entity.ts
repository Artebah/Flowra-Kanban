import { Board } from "src/boards/entities/Board.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("columns")
export class BoardColumn {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  boardId: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column({ nullable: true })
  color?: string;

  @ManyToOne(() => Board, (board) => board.columns, { nullable: false })
  @JoinColumn({ name: "boardId" })
  board: Board;
}
