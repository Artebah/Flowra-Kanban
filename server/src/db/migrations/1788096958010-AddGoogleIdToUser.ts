import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGoogleIdToUser1788096958010 implements MigrationInterface {
    name = 'AddGoogleIdToUser1788096958010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_labels_board"`);
        await queryRunner.query(`ALTER TABLE "tasks_attachments" DROP CONSTRAINT "FK_tasks_attachments_task"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_tasks_column"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_tasks_author"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP CONSTRAINT "FK_columns_board"`);
        await queryRunner.query(`ALTER TABLE "board-members" DROP CONSTRAINT "FK_board_members_user"`);
        await queryRunner.query(`ALTER TABLE "board-members" DROP CONSTRAINT "FK_board_members_board"`);
        await queryRunner.query(`ALTER TABLE "task_labels" DROP CONSTRAINT "FK_task_labels_task"`);
        await queryRunner.query(`ALTER TABLE "task_labels" DROP CONSTRAINT "FK_task_labels_label"`);
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" DROP CONSTRAINT "FK_assigned_members_task"`);
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" DROP CONSTRAINT "FK_assigned_members_user"`);
        await queryRunner.query(`ALTER TABLE "board-members" DROP CONSTRAINT "UQ_board_members_board_user"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "googleId" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_f382af58ab36057334fb262efd5" UNIQUE ("googleId")`);
        await queryRunner.query(`CREATE INDEX "IDX_3bc7e06b961bf72550f33c27cc" ON "task_labels" ("tasksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_64f274b789e6b3464466d2d835" ON "task_labels" ("labelsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d942eb8af60a72e8b7a4cae35b" ON "assigned_members_to_task" ("tasksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d3be2a19faba72674ed52d7962" ON "assigned_members_to_task" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "board-members" ADD CONSTRAINT "UQ_a284a87e4559360334d44b11b5e" UNIQUE ("boardId", "userId")`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_18b754f85358843adaceb6703c4" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks_attachments" ADD CONSTRAINT "FK_28e78d448cc335bd4fe2bf2c242" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_0ecfe75e5bd731e00e634d70e5f" FOREIGN KEY ("columnId") REFERENCES "columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_b455b2f078b9a28bda8e7b3696a" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "columns" ADD CONSTRAINT "FK_ac92bfd7ba33174aabef610f361" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board-members" ADD CONSTRAINT "FK_9009920def52a2150567cd0ee06" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board-members" ADD CONSTRAINT "FK_09d4014033d08057e5cfc7c724f" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_labels" ADD CONSTRAINT "FK_3bc7e06b961bf72550f33c27cce" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_labels" ADD CONSTRAINT "FK_64f274b789e6b3464466d2d8350" FOREIGN KEY ("labelsId") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" ADD CONSTRAINT "FK_d942eb8af60a72e8b7a4cae35b5" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" ADD CONSTRAINT "FK_d3be2a19faba72674ed52d7962b" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" DROP CONSTRAINT "FK_d3be2a19faba72674ed52d7962b"`);
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" DROP CONSTRAINT "FK_d942eb8af60a72e8b7a4cae35b5"`);
        await queryRunner.query(`ALTER TABLE "task_labels" DROP CONSTRAINT "FK_64f274b789e6b3464466d2d8350"`);
        await queryRunner.query(`ALTER TABLE "task_labels" DROP CONSTRAINT "FK_3bc7e06b961bf72550f33c27cce"`);
        await queryRunner.query(`ALTER TABLE "board-members" DROP CONSTRAINT "FK_09d4014033d08057e5cfc7c724f"`);
        await queryRunner.query(`ALTER TABLE "board-members" DROP CONSTRAINT "FK_9009920def52a2150567cd0ee06"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP CONSTRAINT "FK_ac92bfd7ba33174aabef610f361"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_b455b2f078b9a28bda8e7b3696a"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_0ecfe75e5bd731e00e634d70e5f"`);
        await queryRunner.query(`ALTER TABLE "tasks_attachments" DROP CONSTRAINT "FK_28e78d448cc335bd4fe2bf2c242"`);
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_18b754f85358843adaceb6703c4"`);
        await queryRunner.query(`ALTER TABLE "board-members" DROP CONSTRAINT "UQ_a284a87e4559360334d44b11b5e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d3be2a19faba72674ed52d7962"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d942eb8af60a72e8b7a4cae35b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_64f274b789e6b3464466d2d835"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3bc7e06b961bf72550f33c27cc"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_f382af58ab36057334fb262efd5"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "googleId"`);
        await queryRunner.query(`ALTER TABLE "board-members" ADD CONSTRAINT "UQ_board_members_board_user" UNIQUE ("userId", "boardId")`);
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" ADD CONSTRAINT "FK_assigned_members_user" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "assigned_members_to_task" ADD CONSTRAINT "FK_assigned_members_task" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_labels" ADD CONSTRAINT "FK_task_labels_label" FOREIGN KEY ("labelsId") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_labels" ADD CONSTRAINT "FK_task_labels_task" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "board-members" ADD CONSTRAINT "FK_board_members_board" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board-members" ADD CONSTRAINT "FK_board_members_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "columns" ADD CONSTRAINT "FK_columns_board" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_tasks_author" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_tasks_column" FOREIGN KEY ("columnId") REFERENCES "columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks_attachments" ADD CONSTRAINT "FK_tasks_attachments_task" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_labels_board" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
