import { MigrationInterface, QueryRunner } from "typeorm";

export class SetUserPasswordAsNullable1788097298014 implements MigrationInterface {
    name = 'SetUserPasswordAsNullable1788097298014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
    }

}
