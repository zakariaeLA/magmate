import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRequestEntity1746538322381 implements MigrationInterface {
    name = 'AddUserRequestEntity1746538322381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."request_status_enum" AS ENUM('not-sent', 'pending', 'accepted', 'declined', 'waiting-for-current-user-response')`);
        await queryRunner.query(`CREATE TABLE "request" ("id" SERIAL NOT NULL, "status" "public"."request_status_enum" NOT NULL DEFAULT 'not-sent', "creatorId" uuid, "receiverId" uuid, CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_714f665dcb7ea33a577de776481" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_e474c30f189e7757e3db67126a1" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_e474c30f189e7757e3db67126a1"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_714f665dcb7ea33a577de776481"`);
        await queryRunner.query(`DROP TABLE "request"`);
        await queryRunner.query(`DROP TYPE "public"."request_status_enum"`);
    }

}
