import { MigrationInterface, QueryRunner } from "typeorm";

export class defalt1670599432204 implements MigrationInterface {
    name = 'defalt1670599432204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" ADD "block" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "block"`);
    }

}
