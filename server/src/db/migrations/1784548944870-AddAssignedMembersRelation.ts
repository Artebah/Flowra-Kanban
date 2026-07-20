import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAssignedMembersRelation1784548944870 implements MigrationInterface {
    name = 'AddAssignedMembersRelation1784548944870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assignedMembersToTask" ("tasksId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_6f6552ba891583aa037a8098b17" PRIMARY KEY ("tasksId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_834b45f080043c05038f860559" ON "assignedMembersToTask" ("tasksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2b90d74f452f39833ab06b01a9" ON "assignedMembersToTask" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "assignedMembersToTask" ADD CONSTRAINT "FK_834b45f080043c05038f8605598" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "assignedMembersToTask" ADD CONSTRAINT "FK_2b90d74f452f39833ab06b01a94" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignedMembersToTask" DROP CONSTRAINT "FK_2b90d74f452f39833ab06b01a94"`);
        await queryRunner.query(`ALTER TABLE "assignedMembersToTask" DROP CONSTRAINT "FK_834b45f080043c05038f8605598"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2b90d74f452f39833ab06b01a9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_834b45f080043c05038f860559"`);
        await queryRunner.query(`DROP TABLE "assignedMembersToTask"`);
    }

}
