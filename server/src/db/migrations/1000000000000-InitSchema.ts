import { MigrationInterface, QueryRunner } from "typeorm";

// Names of all migrations that were written before this init migration.
// On a DB that was pre-populated by TypeORM synchronize (tables already exist),
// we insert these into the migrations table so TypeORM won't try to run them.
const LEGACY_MIGRATIONS: { timestamp: number; name: string }[] = [
  { timestamp: 1772826516018, name: "Init1772826516018" },
  { timestamp: 1774634766935, name: "UpdateTaskOrderDecimalPrecision1774634766935" },
  { timestamp: 1776761658634, name: "TestWorkingMigrationConfig1776761658634" },
  { timestamp: 1776761740120, name: "Test21776761740120" },
  { timestamp: 1776761795844, name: "RemoveTestColumnFromUser1776761795844" },
  { timestamp: 1777039657984, name: "SplitTaskDescriptionToTwoFields1777039657984" },
  { timestamp: 1780930718606, name: "AddIsCompletedColumnForTasks1780930718606" },
  { timestamp: 1782070953588, name: "AddLabelEntity1782070953588" },
  { timestamp: 1783177303858, name: "AddRelationForBoardAndLabels1783177303858" },
  { timestamp: 1783841168468, name: "AddCascadeDeleteForTaskLabels1783841168468" },
  { timestamp: 1783979994247, name: "Test1783979994247" },
  { timestamp: 1783980352000, name: "AddBaseEntityFields1783980352000" },
  { timestamp: 1784117516951, name: "AddColumnsCascadeOnDeleteBoard1784117516951" },
  { timestamp: 1784117741155, name: "AddDeleteCascadeOnDeleteBoard1784117741155" },
  { timestamp: 1784117827188, name: "AddDeleteCascadeLabelsOnDeleteBoard1784117827188" },
  { timestamp: 1784142671339, name: "AllowLabelsWithoutTitle1784142671339" },
  { timestamp: 1784548944870, name: "AddAssignedMembersRelation1784548944870" },
  { timestamp: 1784551341383, name: "UpdateAssignedLabelsAndMembersTablesNames1784551341383" },
  { timestamp: 1784627369643, name: "AddDueDateToTask1784627369643" },
  { timestamp: 1784680830627, name: "UpdateAssignedLabelsAndMembersTablesNames1784680830627" },
  { timestamp: 1784709298120, name: "AddTasksAttachmentsTable1784709298120" },
  { timestamp: 1784733654795, name: "AddBaseEntityForTaskAttachment1784733654795" },
  { timestamp: 1784879007246, name: "AddProfileCompletionFields1784879007246" },
  { timestamp: 1785409152226, name: "AddCoverUrlForBoard1785409152226" },
  { timestamp: 1785410258634, name: "AddCoverBgColorForBoard1785410258634" },
  { timestamp: 1785755330219, name: "AddUniqueBoardIdAndUserIdInBoardMember1785755330219" },
];

export class InitSchema1000000000000 implements MigrationInterface {
  name = "InitSchema1000000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    const tablesExist = await queryRunner.hasTable("users");

    if (tablesExist) {
      // DB was already set up via synchronize — mark all legacy migrations as run
      // so TypeORM won't attempt to re-apply them.
      const migrationsTable = queryRunner.connection.options.migrationsTableName ?? "migrations";
      for (const m of LEGACY_MIGRATIONS) {
        await queryRunner.query(
          `INSERT INTO "${migrationsTable}" ("timestamp", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [m.timestamp, m.name],
        );
      }
      return;
    }

    // Fresh database — create the full schema from scratch.
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

    // Mark all legacy migrations as already run so TypeORM doesn't try to apply them
    // on top of the schema we just created.
    const migrationsTable = queryRunner.connection.options.migrationsTableName ?? "migrations";
    for (const m of LEGACY_MIGRATIONS) {
      await queryRunner.query(
        `INSERT INTO "${migrationsTable}" ("timestamp", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [m.timestamp, m.name],
      );
    }
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
