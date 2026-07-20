import { Expose, Type } from "class-transformer";
import { BaseEntity } from "src/common/entities/base.entity";
import { BoardColumn } from "src/columns/entities/Column.entity";
import { JSONContent } from "src/common/types/json-content.interface";
import { User } from "src/users/entities/User.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Label } from "src/labels/entities/Label.entity";

@Entity("tasks")
export class Task extends BaseEntity {
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
  isCompleted: boolean;

  @Column({ nullable: false })
  @Expose()
  title: string;

  @Column({ type: "jsonb", nullable: true })
  @Expose()
  descriptionContent: JSONContent | null;

  @Column({ type: "text", nullable: true })
  @Expose()
  descriptionSearch: string;

  @Column({ nullable: false })
  @Expose()
  columnId: string;

  @Column({ nullable: false })
  @Expose()
  authorId: string;

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

  @Expose()
  @ManyToMany(() => Label, (label) => label.tasks, { onDelete: "CASCADE" })
  @JoinTable({ name: "task_labels" })
  labels: Label[];

  @Expose()
  @ManyToMany(() => User, (user) => user.assignedTasks)
  @JoinTable({ name: "assignedMembersToTask" })
  assignedMembers: User[];
}
