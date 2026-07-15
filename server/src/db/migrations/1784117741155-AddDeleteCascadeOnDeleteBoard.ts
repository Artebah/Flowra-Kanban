import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeleteCascadeOnDeleteBoard1784117741155 implements MigrationInterface {
    name = 'AddDeleteCascadeOnDeleteBoard1784117741155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board-members" DROP CONSTRAINT "FK_9009920def52a2150567cd0ee06"`);
        await queryRunner.query(`ALTER TABLE "board-members" DROP CONSTRAINT "FK_09d4014033d08057e5cfc7c724f"`);
        await queryRunner.query(`ALTER TABLE "board-members" ADD CONSTRAINT "FK_9009920def52a2150567cd0ee06" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board-members" ADD CONSTRAINT "FK_09d4014033d08057e5cfc7c724f" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board-members" DROP CONSTRAINT "FK_09d4014033d08057e5cfc7c724f"`);
        await queryRunner.query(`ALTER TABLE "board-members" DROP CONSTRAINT "FK_9009920def52a2150567cd0ee06"`);
        await queryRunner.query(`ALTER TABLE "board-members" ADD CONSTRAINT "FK_09d4014033d08057e5cfc7c724f" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board-members" ADD CONSTRAINT "FK_9009920def52a2150567cd0ee06" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
