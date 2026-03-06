import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1772826516018 implements MigrationInterface {
    name = 'Init1772826516018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
    }

}
