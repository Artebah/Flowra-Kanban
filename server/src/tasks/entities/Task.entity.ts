import { Expose } from "class-transformer";
import { BoardColumn } from "src/columns/entities/Column.entity";
import { User } from "src/users/entities/User.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  id: string;

  @Column({ nullable: false })
  @Expose()
  order: number;

  @Column({ nullable: false })
  @Expose()
  title: string;

  @Column({ nullable: true })
  @Expose()
  description?: string;

  @Column({ nullable: false })
  @Expose()
  columnId: string;

  @Column({ nullable: false })
  @Expose()
  authorId: string;

  @CreateDateColumn()
  @Expose()
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  updatedAt: Date;

  @ManyToOne(() => BoardColumn, (column) => column.tasks)
  @JoinColumn({ name: "columnId" })
  column: BoardColumn;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "authorId" })
  author: User;
}
