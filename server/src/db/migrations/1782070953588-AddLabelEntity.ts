import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLabelEntity1782070953588 implements MigrationInterface {
    name = 'AddLabelEntity1782070953588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "labels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "color" character varying NOT NULL, CONSTRAINT "PK_c0c4e97f76f1f3a268c7a70b925" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_labels" ("tasksId" uuid NOT NULL, "labelsId" uuid NOT NULL, CONSTRAINT "PK_12b077fa98a4ace22fb1460a085" PRIMARY KEY ("tasksId", "labelsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3bc7e06b961bf72550f33c27cc" ON "task_labels" ("tasksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_64f274b789e6b3464466d2d835" ON "task_labels" ("labelsId") `);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "isCompleted" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task_labels" ADD CONSTRAINT "FK_3bc7e06b961bf72550f33c27cce" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_labels" ADD CONSTRAINT "FK_64f274b789e6b3464466d2d8350" FOREIGN KEY ("labelsId") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_labels" DROP CONSTRAINT "FK_64f274b789e6b3464466d2d8350"`);
        await queryRunner.query(`ALTER TABLE "task_labels" DROP CONSTRAINT "FK_3bc7e06b961bf72550f33c27cce"`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "isCompleted" SET DEFAULT false`);
        await queryRunner.query(`DROP INDEX "public"."IDX_64f274b789e6b3464466d2d835"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3bc7e06b961bf72550f33c27cc"`);
        await queryRunner.query(`DROP TABLE "task_labels"`);
        await queryRunner.query(`DROP TABLE "labels"`);
    }

}
