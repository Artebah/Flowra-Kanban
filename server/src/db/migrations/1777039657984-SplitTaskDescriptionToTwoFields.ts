import { MigrationInterface, QueryRunner } from "typeorm";

export class SplitTaskDescriptionToTwoFields1777039657984 implements MigrationInterface {
    name = 'SplitTaskDescriptionToTwoFields1777039657984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Add new columns while allowing NULL values during the transition phase
        await queryRunner.query(`ALTER TABLE "tasks" ADD "descriptionContent" jsonb`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "descriptionSearch" text`);

        // 2. Migrate existing data from the old column to the new ones
        // We wrap the plain text into a basic Tiptap JSON structure (doc > paragraph > text)
        await queryRunner.query(`
            UPDATE "tasks" 
            SET 
                "descriptionSearch" = "description",
                "descriptionContent" = jsonb_build_object(
                    'type', 'doc',
                    'content', jsonb_build_array(
                        jsonb_build_object(
                            'type', 'paragraph', 
                            'content', jsonb_build_array(
                                jsonb_build_object('type', 'text', 'text', "description")
                            )
                        )
                    )
                )
            WHERE "description" IS NOT NULL
        `);

        // 3. Drop the old column now that data has been safely migrated
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverse process: recreate the old column
        await queryRunner.query(`ALTER TABLE "tasks" ADD "description" character varying`);
        
        // Restore data from the search (plain text) column
        await queryRunner.query(`
            UPDATE "tasks" 
            SET "description" = "descriptionSearch"
        `);

        // Remove the new columns
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "descriptionSearch"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "descriptionContent"`);
    }
}