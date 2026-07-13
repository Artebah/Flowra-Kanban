import { Expose } from "class-transformer";
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "src/tasks/entities/Task.entity";
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

  @Column()
  boardId: string;

  @ManyToMany(() => Task, (task) => task.labels, { onDelete: "CASCADE" })
  tasks: Task[];

  @ManyToOne(() => Board, (board) => board.labels)
  board: Board;
}
