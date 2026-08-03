import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueBoardIdAndUserIdInBoardMember1785755330219 implements MigrationInterface {
    name = 'AddUniqueBoardIdAndUserIdInBoardMember1785755330219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" ALTER COLUMN "coverBgColor" DROP DEFAULT`);
        await queryRunner.query(`ALTER TYPE "public"."board-members_role_enum" RENAME TO "board-members_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."board-members_role_enum" AS ENUM('member', 'owner', 'admin')`);
        await queryRunner.query(`ALTER TABLE "board-members" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "board-members" ALTER COLUMN "role" TYPE "public"."board-members_role_enum" USING "role"::"text"::"public"."board-members_role_enum"`);
        await queryRunner.query(`ALTER TABLE "board-members" ALTER COLUMN "role" SET DEFAULT 'member'`);
        await queryRunner.query(`DROP TYPE "public"."board-members_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "board-members" ADD CONSTRAINT "UQ_a284a87e4559360334d44b11b5e" UNIQUE ("boardId", "userId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board-members" DROP CONSTRAINT "UQ_a284a87e4559360334d44b11b5e"`);
        await queryRunner.query(`CREATE TYPE "public"."board-members_role_enum_old" AS ENUM('member', 'owner')`);
        await queryRunner.query(`ALTER TABLE "board-members" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "board-members" ALTER COLUMN "role" TYPE "public"."board-members_role_enum_old" USING "role"::"text"::"public"."board-members_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "board-members" ALTER COLUMN "role" SET DEFAULT 'member'`);
        await queryRunner.query(`DROP TYPE "public"."board-members_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."board-members_role_enum_old" RENAME TO "board-members_role_enum"`);
        await queryRunner.query(`ALTER TABLE "boards" ALTER COLUMN "coverBgColor" SET DEFAULT '#E9D5FF'`);
    }

}
