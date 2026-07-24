import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfileCompletionFields1784879007246 implements MigrationInterface {
    name = 'AddProfileCompletionFields1784879007246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isProfileCompleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "username" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isProfileCompleted"`);
    }

}
