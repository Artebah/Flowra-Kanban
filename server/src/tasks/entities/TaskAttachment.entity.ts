import { Expose } from "class-transformer";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task.entity";

@Entity("tasks_attachments")
export class TaskAttachment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  id: string;

  @Expose()
  @Column()
  taskId: string;

  @Expose()
  @Column()
  url: string;

  @Expose()
  @Column()
  fileName: string;

  @ManyToOne(() => Task, (task) => task.attachments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "taskId" })
  task: Task;
}
