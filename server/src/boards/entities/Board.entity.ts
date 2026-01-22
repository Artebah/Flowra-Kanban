import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("boards")
export class Board {
  @Expose()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Expose()
  @Column()
  title: string;

  @Expose()
  @CreateDateColumn()
  createdAt: string;
}
