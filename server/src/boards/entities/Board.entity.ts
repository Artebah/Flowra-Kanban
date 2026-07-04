import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BoardMember } from "./BoardMember.entity";
import { BoardColumn } from "src/columns/entities/Column.entity";
import { Label } from "src/tasks/entities/Label.entity";

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

  @OneToMany(() => BoardMember, (boardMember) => boardMember.board)
  boardMembers: BoardMember[];

  @OneToMany(() => BoardColumn, (boardColumn) => boardColumn.board)
  columns: BoardColumn[];

  @OneToMany(() => Label, (label) => label.board)
  labels: Label[];
}
