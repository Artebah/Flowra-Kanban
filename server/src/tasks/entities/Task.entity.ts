import { BoardColumn } from "src/columns/entities/Column.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  order: number;

  @Column({ nullable: false })
  title: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => BoardColumn, (column) => column.tasks)
  column: string;

  @Column({ nullable: false })
  author: string;
}
