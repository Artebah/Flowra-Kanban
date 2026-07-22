import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTasksAttachmentsTable1784709298120 implements MigrationInterface {
    name = 'AddTasksAttachmentsTable1784709298120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks_attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "taskId" uuid NOT NULL, "url" character varying NOT NULL, "fileName" character varying NOT NULL, CONSTRAINT "PK_bdca964052b3af8720b2dc43ef7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks_attachments" ADD CONSTRAINT "FK_28e78d448cc335bd4fe2bf2c242" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_attachments" DROP CONSTRAINT "FK_28e78d448cc335bd4fe2bf2c242"`);
        await queryRunner.query(`DROP TABLE "tasks_attachments"`);
    }

}
