import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDueDateToTask1784627369643 implements MigrationInterface {
    name = 'AddDueDateToTask1784627369643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "dueDate" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "dueDate"`);
    }

}
