import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoverUrlForBoard1785409152226 implements MigrationInterface {
    name = 'AddCoverUrlForBoard1785409152226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" ADD "coverUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "coverUrl"`);
    }

}
