import { Expose } from "class-transformer";
import { Board } from "src/boards/entities/Board.entity";
import { Task } from "src/tasks/entities/Task.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

@Entity("columns")
export class BoardColumn {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  id: string;

  @Column()
  @Expose()
  boardId: string;

  @Column()
  @Expose()
  title: string;

  @Column({ type: "int" })
  @Expose()
  order: number;

  @Column({ nullable: true })
  @Expose()
  color?: string;

  @ManyToOne(() => Board, (board) => board.columns, { nullable: false })
  @JoinColumn({ name: "boardId" })
  board: Board;

  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[];
}
