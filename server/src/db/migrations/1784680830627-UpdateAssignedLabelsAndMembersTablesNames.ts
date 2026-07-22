import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAssignedLabelsAndMembersTablesNames1784680830627 implements MigrationInterface {
    name = 'UpdateAssignedLabelsAndMembersTablesNames1784680830627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(` ALTER TABLE "tasks"
        ALTER COLUMN "dueDate" TYPE TIMESTAMP WITH TIME ZONE
        USING "dueDate"::TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(` ALTER TABLE "tasks"
        ALTER COLUMN "dueDate" TYPE character varying
        USING "dueDate"::text`);
    }

}
