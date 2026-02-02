import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("columns")
export class BoardColumn {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  boardId: string;

  @Column()
  title: string;

  @Column()
  order: string;

  @Column({ nullable: true })
  color?: string;
}
