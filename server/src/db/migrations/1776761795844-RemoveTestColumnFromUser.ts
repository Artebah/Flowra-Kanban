import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTestColumnFromUser1776761795844 implements MigrationInterface {
    name = 'RemoveTestColumnFromUser1776761795844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "testNew"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "testNew" character varying`);
    }

}
