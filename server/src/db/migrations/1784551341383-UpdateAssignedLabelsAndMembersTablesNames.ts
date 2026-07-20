import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAssignedLabelsAndMembersTablesNames1784551341383 implements MigrationInterface {
    name = 'UpdateAssignedLabelsAndMembersTablesNames1784551341383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignedMembersToTask" DROP CONSTRAINT "FK_2b90d74f452f39833ab06b01a94"`);
        await queryRunner.query(`ALTER TABLE "assignedMembersToTask" DROP CONSTRAINT "FK_834b45f080043c05038f8605598"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2b90d74f452f39833ab06b01a9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_834b45f080043c05038f860559"`);
        await queryRunner.query(`ALTER TABLE "assignedMembersToTask" RENAME TO "assigned_members_to_task"`);
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" RENAME CONSTRAINT "PK_6f6552ba891583aa037a8098b17" TO "PK_28bca1be6b30fabb6e016bc7917"`);
        await queryRunner.query(`CREATE INDEX "IDX_d942eb8af60a72e8b7a4cae35b" ON "assigned_members_to_task" ("tasksId")`);
        await queryRunner.query(`CREATE INDEX "IDX_d3be2a19faba72674ed52d7962" ON "assigned_members_to_task" ("usersId")`);
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" ADD CONSTRAINT "FK_d942eb8af60a72e8b7a4cae35b5" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" ADD CONSTRAINT "FK_d3be2a19faba72674ed52d7962b" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" DROP CONSTRAINT "FK_d3be2a19faba72674ed52d7962b"`);
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" DROP CONSTRAINT "FK_d942eb8af60a72e8b7a4cae35b5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d3be2a19faba72674ed52d7962"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d942eb8af60a72e8b7a4cae35b"`);
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" RENAME CONSTRAINT "PK_28bca1be6b30fabb6e016bc7917" TO "PK_6f6552ba891583aa037a8098b17"`);
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" RENAME TO "assignedMembersToTask"`);
        await queryRunner.query(`CREATE INDEX "IDX_834b45f080043c05038f860559" ON "assignedMembersToTask" ("tasksId")`);
        await queryRunner.query(`CREATE INDEX "IDX_2b90d74f452f39833ab06b01a9" ON "assignedMembersToTask" ("usersId")`);
        await queryRunner.query(`ALTER TABLE "assignedMembersToTask" ADD CONSTRAINT "FK_834b45f080043c05038f8605598" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "assignedMembersToTask" ADD CONSTRAINT "FK_2b90d74f452f39833ab06b01a94" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
