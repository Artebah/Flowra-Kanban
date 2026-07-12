import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeDeleteForTaskLabels1783841168468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task_labels"
            DROP CONSTRAINT "FK_64f274b789e6b3464466d2d8350"
        `);

        await queryRunner.query(`
            ALTER TABLE "task_labels"
            ADD CONSTRAINT "FK_task_labels_label"
            FOREIGN KEY ("labelsId") REFERENCES "labels"("id") ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task_labels"
            DROP CONSTRAINT "FK_task_labels_label"
        `);

        await queryRunner.query(`
            ALTER TABLE "task_labels"
            ADD CONSTRAINT "FK_64f274b789e6b3464466d2d8350"
            FOREIGN KEY ("labelsId") REFERENCES "labels"("id")
        `);
    }

}
