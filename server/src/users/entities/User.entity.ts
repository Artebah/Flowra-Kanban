import { Expose } from "class-transformer";
import { BaseEntity } from "src/common/entities/base.entity";
import { BoardMember } from "src/boards/entities/BoardMember.entity";
import { Task } from "src/tasks/entities/Task.entity";
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  id: string;

  @Column({ nullable: true })
  @Expose()
  username?: string;

  @Column()
  password: string;

  @Column()
  @Expose()
  email: string;

  @Column({ default: false })
  @Expose()
  isProfileCompleted: boolean;

  @Column({ nullable: true })
  @Expose()
  avatar?: string;

  @OneToMany(() => BoardMember, (boardMember) => boardMember.user)
  boardMembers: BoardMember[];

  @OneToMany(() => Task, (task) => task.author)
  tasks: Task[];

  @ManyToMany(() => Task, (task) => task.assignedMembers)
  assignedTasks: Task[];
}
