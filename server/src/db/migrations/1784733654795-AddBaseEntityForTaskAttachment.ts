import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntityForTaskAttachment1784733654795 implements MigrationInterface {
    name = 'AddBaseEntityForTaskAttachment1784733654795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_attachments" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tasks_attachments" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_attachments" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "tasks_attachments" DROP COLUMN "createdAt"`);
    }

}
