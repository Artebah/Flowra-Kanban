import { Expose } from "class-transformer";
import { BaseEntity } from "src/common/entities/base.entity";
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
export class Label extends BaseEntity {
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

  @ManyToOne(() => Board, (board) => board.labels, { onDelete: "CASCADE" })
  board: Board;
}
