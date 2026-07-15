import { Expose } from "class-transformer";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BoardMember } from "./BoardMember.entity";
import { BoardColumn } from "src/columns/entities/Column.entity";
import { Label } from "src/labels/entities/Label.entity";

@Entity("boards")
export class Board extends BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Expose()
  @Column()
  title: string;

  @OneToMany(() => BoardMember, (boardMember) => boardMember.board)
  boardMembers: BoardMember[];

  @OneToMany(() => BoardColumn, (boardColumn) => boardColumn.board)
  columns: BoardColumn[];

  @OneToMany(() => Label, (label) => label.board)
  labels: Label[];
}
