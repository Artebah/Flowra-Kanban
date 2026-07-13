import { Expose } from "class-transformer";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @CreateDateColumn()
  @Expose()
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  updatedAt: Date;
}
