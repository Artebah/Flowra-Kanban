import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationForBoardAndLabels1783177303858 implements MigrationInterface {
    name = 'AddRelationForBoardAndLabels1783177303858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_labels" DROP CONSTRAINT "FK_64f274b789e6b3464466d2d8350"`);
        await queryRunner.query(`ALTER TABLE "labels" ADD "boardId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_18b754f85358843adaceb6703c4" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_labels" ADD CONSTRAINT "FK_64f274b789e6b3464466d2d8350" FOREIGN KEY ("labelsId") REFERENCES "labels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_labels" DROP CONSTRAINT "FK_64f274b789e6b3464466d2d8350"`);
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_18b754f85358843adaceb6703c4"`);
        await queryRunner.query(`ALTER TABLE "labels" DROP COLUMN "boardId"`);
        await queryRunner.query(`ALTER TABLE "task_labels" ADD CONSTRAINT "FK_64f274b789e6b3464466d2d8350" FOREIGN KEY ("labelsId") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
