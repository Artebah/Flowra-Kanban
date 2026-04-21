import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21776761740120 implements MigrationInterface {
    name = 'Test21776761740120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "test" TO "testNew"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "testNew" TO "test"`);
    }

}
