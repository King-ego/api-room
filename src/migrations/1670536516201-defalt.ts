import { MigrationInterface, QueryRunner } from "typeorm";

export class defalt1670536516201 implements MigrationInterface {
    name = 'defalt1670536516201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "description"`);
    }

}
