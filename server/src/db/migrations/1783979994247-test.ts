import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1783979994247 implements MigrationInterface {
    name = 'Test1783979994247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_labels" DROP CONSTRAINT "FK_task_labels_label"`);
        await queryRunner.query(`ALTER TABLE "task_labels" ADD CONSTRAINT "FK_64f274b789e6b3464466d2d8350" FOREIGN KEY ("labelsId") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_labels" DROP CONSTRAINT "FK_64f274b789e6b3464466d2d8350"`);
        await queryRunner.query(`ALTER TABLE "task_labels" ADD CONSTRAINT "FK_task_labels_label" FOREIGN KEY ("labelsId") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
