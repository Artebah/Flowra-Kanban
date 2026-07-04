import { Expose } from "class-transformer";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task.entity";

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
}
