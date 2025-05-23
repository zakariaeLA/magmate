import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1746827146373 implements MigrationInterface {
    name = 'InitialSchema1746827146373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "magasin" DROP CONSTRAINT "FK_ed8d55524456f4527c2ed2310a6"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_c57b48ac6427ba5400be9bf9341"`);
        await queryRunner.query(`ALTER TABLE "produit" DROP CONSTRAINT "FK_53603125c6c470f4198dbb664e2"`);
        await queryRunner.query(`ALTER TABLE "magasin" RENAME COLUMN "proprietaireId" TO "proprietaireIdUtilisateur"`);
        await queryRunner.query(`ALTER TABLE "magasin" ALTER COLUMN "proprietaireIdUtilisateur" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "image" ALTER COLUMN "produitIdProduit" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "PK_ba01f0a3e0123651915008bc578"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "conversationId" uuid`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" DROP CONSTRAINT "FK_7835ccf192c47ae47cd5c250d5a"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "PK_864528ec4274360a40f66c29845"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "active_conversation" DROP CONSTRAINT "PK_6f97b383c8aae028538526304ca"`);
        await queryRunner.query(`ALTER TABLE "active_conversation" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "active_conversation" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "active_conversation" ADD CONSTRAINT "PK_6f97b383c8aae028538526304ca" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "active_conversation" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "active_conversation" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "active_conversation" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "active_conversation" ADD "conversationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" DROP CONSTRAINT "PK_39cd0ac92f269976929656be1d7"`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" ADD CONSTRAINT "PK_b4d7dfd81d3b743bcfd1682abeb" PRIMARY KEY ("userId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7835ccf192c47ae47cd5c250d5"`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" ADD "conversationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" DROP CONSTRAINT "PK_b4d7dfd81d3b743bcfd1682abeb"`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" ADD CONSTRAINT "PK_39cd0ac92f269976929656be1d7" PRIMARY KEY ("userId", "conversationId")`);
        await queryRunner.query(`CREATE INDEX "IDX_7835ccf192c47ae47cd5c250d5" ON "conversation_users_user" ("conversationId") `);
        await queryRunner.query(`ALTER TABLE "magasin" ADD CONSTRAINT "FK_04e737a5702fc0a41060d459120" FOREIGN KEY ("proprietaireIdUtilisateur") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_c57b48ac6427ba5400be9bf9341" FOREIGN KEY ("produitIdProduit") REFERENCES "produit"("idProduit") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produit" ADD CONSTRAINT "FK_53603125c6c470f4198dbb664e2" FOREIGN KEY ("magasinIdMagasin") REFERENCES "magasin"("idMagasin") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" ADD CONSTRAINT "FK_7835ccf192c47ae47cd5c250d5a" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_users_user" DROP CONSTRAINT "FK_7835ccf192c47ae47cd5c250d5a"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f"`);
        await queryRunner.query(`ALTER TABLE "produit" DROP CONSTRAINT "FK_53603125c6c470f4198dbb664e2"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_c57b48ac6427ba5400be9bf9341"`);
        await queryRunner.query(`ALTER TABLE "magasin" DROP CONSTRAINT "FK_04e737a5702fc0a41060d459120"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7835ccf192c47ae47cd5c250d5"`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" DROP CONSTRAINT "PK_39cd0ac92f269976929656be1d7"`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" ADD CONSTRAINT "PK_b4d7dfd81d3b743bcfd1682abeb" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" ADD "conversationId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_7835ccf192c47ae47cd5c250d5" ON "conversation_users_user" ("conversationId") `);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" DROP CONSTRAINT "PK_b4d7dfd81d3b743bcfd1682abeb"`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" ADD CONSTRAINT "PK_39cd0ac92f269976929656be1d7" PRIMARY KEY ("conversationId", "userId")`);
        await queryRunner.query(`ALTER TABLE "active_conversation" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "active_conversation" ADD "conversationId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "active_conversation" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "active_conversation" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "active_conversation" DROP CONSTRAINT "PK_6f97b383c8aae028538526304ca"`);
        await queryRunner.query(`ALTER TABLE "active_conversation" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "active_conversation" ADD "id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "active_conversation" ADD CONSTRAINT "PK_6f97b383c8aae028538526304ca" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "PK_864528ec4274360a40f66c29845"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "conversation_users_user" ADD CONSTRAINT "FK_7835ccf192c47ae47cd5c250d5a" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "conversationId" integer`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "PK_ba01f0a3e0123651915008bc578"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ALTER COLUMN "produitIdProduit" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "magasin" ALTER COLUMN "proprietaireIdUtilisateur" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "magasin" RENAME COLUMN "proprietaireIdUtilisateur" TO "proprietaireId"`);
        await queryRunner.query(`ALTER TABLE "produit" ADD CONSTRAINT "FK_53603125c6c470f4198dbb664e2" FOREIGN KEY ("magasinIdMagasin") REFERENCES "magasin"("idMagasin") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_c57b48ac6427ba5400be9bf9341" FOREIGN KEY ("produitIdProduit") REFERENCES "produit"("idProduit") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "magasin" ADD CONSTRAINT "FK_ed8d55524456f4527c2ed2310a6" FOREIGN KEY ("proprietaireId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
