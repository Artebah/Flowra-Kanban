import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoverBgColorForBoard1785410258634 implements MigrationInterface {
    name = 'AddCoverBgColorForBoard1785410258634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" ADD "coverBgColor" character varying NOT NULL DEFAULT '#E9D5FF'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "coverBgColor"`);
    }

}
