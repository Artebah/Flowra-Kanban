import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeleteCascadeLabelsOnDeleteBoard1784117827188 implements MigrationInterface {
    name = 'AddDeleteCascadeLabelsOnDeleteBoard1784117827188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_18b754f85358843adaceb6703c4"`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_18b754f85358843adaceb6703c4" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_18b754f85358843adaceb6703c4"`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_18b754f85358843adaceb6703c4" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
