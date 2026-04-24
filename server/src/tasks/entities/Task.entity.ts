import { Expose, Type } from "class-transformer";
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

  @Column({
    nullable: false,
    type: "decimal",
    precision: 20,
    scale: 15,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  @Expose()
  order: number;

  @Column({ nullable: false })
  @Expose()
  title: string;

  @Column({ type: "jsonb", nullable: true })
  @Expose()
  descriptionContent: any;

  @Column({ type: "text", nullable: true })
  @Expose()
  descriptionSearch: string;

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

  @Expose()
  @Type(() => BoardColumn)
  @ManyToOne(() => BoardColumn, (column) => column.tasks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "columnId" })
  column: BoardColumn;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "authorId" })
  author: User;
}
