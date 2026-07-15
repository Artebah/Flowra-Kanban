import { MigrationInterface, QueryRunner } from "typeorm";

export class AllowLabelsWithoutTitle1784142671339 implements MigrationInterface {
    name = 'AllowLabelsWithoutTitle1784142671339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "labels" ALTER COLUMN "title" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "labels" ALTER COLUMN "title" SET NOT NULL`);
    }

}
