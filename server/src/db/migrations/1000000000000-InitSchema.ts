import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1000000000000 implements MigrationInterface {
  name = "InitSchema1000000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "username" character varying,
        "password" character varying NOT NULL,
        "email" character varying NOT NULL,
        "isProfileCompleted" boolean NOT NULL DEFAULT false,
        "avatar" character varying,
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "boards" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "coverUrl" character varying,
        "coverBgColor" character varying NOT NULL,
        CONSTRAINT "PK_boards" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "public"."board-members_role_enum" AS ENUM('member', 'owner', 'admin');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "board-members" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "role" "public"."board-members_role_enum" NOT NULL DEFAULT 'member',
        "userId" uuid NOT NULL,
        "boardId" uuid NOT NULL,
        CONSTRAINT "UQ_board_members_board_user" UNIQUE ("boardId", "userId"),
        CONSTRAINT "PK_board_members" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "board-members"
        DROP CONSTRAINT IF EXISTS "FK_board_members_user",
        ADD CONSTRAINT "FK_board_members_user"
          FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "board-members"
        DROP CONSTRAINT IF EXISTS "FK_board_members_board",
        ADD CONSTRAINT "FK_board_members_board"
          FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "columns" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "boardId" uuid NOT NULL,
        "title" character varying NOT NULL,
        "order" integer NOT NULL,
        "color" character varying,
        CONSTRAINT "PK_columns" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "columns"
        DROP CONSTRAINT IF EXISTS "FK_columns_board",
        ADD CONSTRAINT "FK_columns_board"
          FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "labels" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying,
        "color" character varying NOT NULL,
        "boardId" uuid NOT NULL,
        CONSTRAINT "PK_labels" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "labels"
        DROP CONSTRAINT IF EXISTS "FK_labels_board",
        ADD CONSTRAINT "FK_labels_board"
          FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "tasks" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "order" numeric(20,15) NOT NULL DEFAULT 0,
        "isCompleted" boolean NOT NULL,
        "title" character varying NOT NULL,
        "descriptionContent" jsonb,
        "descriptionSearch" text,
        "columnId" uuid NOT NULL,
        "authorId" uuid NOT NULL,
        "dueDate" TIMESTAMP WITH TIME ZONE,
        CONSTRAINT "PK_tasks" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "tasks"
        DROP CONSTRAINT IF EXISTS "FK_tasks_column",
        ADD CONSTRAINT "FK_tasks_column"
          FOREIGN KEY ("columnId") REFERENCES "columns"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "tasks"
        DROP CONSTRAINT IF EXISTS "FK_tasks_author",
        ADD CONSTRAINT "FK_tasks_author"
          FOREIGN KEY ("authorId") REFERENCES "users"("id")
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "task_labels" (
        "tasksId" uuid NOT NULL,
        "labelsId" uuid NOT NULL,
        CONSTRAINT "PK_task_labels" PRIMARY KEY ("tasksId", "labelsId")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "task_labels"
        DROP CONSTRAINT IF EXISTS "FK_task_labels_task",
        ADD CONSTRAINT "FK_task_labels_task"
          FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "task_labels"
        DROP CONSTRAINT IF EXISTS "FK_task_labels_label",
        ADD CONSTRAINT "FK_task_labels_label"
          FOREIGN KEY ("labelsId") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "assigned_members_to_task" (
        "tasksId" uuid NOT NULL,
        "usersId" uuid NOT NULL,
        CONSTRAINT "PK_assigned_members_to_task" PRIMARY KEY ("tasksId", "usersId")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "assigned_members_to_task"
        DROP CONSTRAINT IF EXISTS "FK_assigned_members_task",
        ADD CONSTRAINT "FK_assigned_members_task"
          FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "assigned_members_to_task"
        DROP CONSTRAINT IF EXISTS "FK_assigned_members_user",
        ADD CONSTRAINT "FK_assigned_members_user"
          FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "tasks_attachments" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "taskId" uuid NOT NULL,
        "url" character varying NOT NULL,
        "fileName" character varying NOT NULL,
        CONSTRAINT "PK_tasks_attachments" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "tasks_attachments"
        DROP CONSTRAINT IF EXISTS "FK_tasks_attachments_task",
        ADD CONSTRAINT "FK_tasks_attachments_task"
          FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "tasks_attachments"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "assigned_members_to_task"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "task_labels"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "tasks"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "labels"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "columns"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "board-members"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."board-members_role_enum"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "boards"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}
