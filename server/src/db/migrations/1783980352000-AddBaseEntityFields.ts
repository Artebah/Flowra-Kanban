import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntityFields1783980352000 implements MigrationInterface {
    name = 'AddBaseEntityFields1783980352000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "labels" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "labels" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "columns" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "columns" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boards" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "board-members" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "board-members" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board-members" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "board-members" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "labels" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "labels" DROP COLUMN "createdAt"`);
    }

}
