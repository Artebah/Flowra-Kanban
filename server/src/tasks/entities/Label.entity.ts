import { Expose } from "class-transformer";
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task.entity";
import { Board } from "src/boards/entities/Board.entity";

@Entity("labels")
export class Label {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  id: string;

  @Column({ nullable: false })
  @Expose()
  title: string;

  @Column({ nullable: false })
  @Expose()
  color: string;

  @ManyToMany(() => Task, (task) => task.labels)
  tasks: Task[];

  @Column()
  boardId: string;

  @ManyToOne(() => Board, (board) => board.labels)
  board: Board;
}
