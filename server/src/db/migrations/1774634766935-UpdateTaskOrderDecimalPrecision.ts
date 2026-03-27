import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTaskOrderDecimalPrecision1774634766935
  implements MigrationInterface
{
  name = "UpdateTaskOrderDecimalPrecision1774634766935";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "order" TYPE numeric(20,15) USING "order"::numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "order" SET DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "order" TYPE integer USING ROUND("order")::integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "order" DROP DEFAULT`,
    );
  }
}
