import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateAllTables1700000000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "cpf" character varying,
        "phone_number" character varying,
        "password_hash" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `)

    await queryRunner.query(`
      CREATE TABLE "cemiteries" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "image_url" character varying,
        "city" character varying NOT NULL,
        "neighbourhood" character varying NOT NULL,
        "street" character varying,
        "lat" numeric(10,7),
        "lng" numeric(10,7),
        "price" numeric(10,2) NOT NULL,
        "active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_cemiteries" PRIMARY KEY ("id")
      )
    `)

    await queryRunner.query(`
      CREATE TABLE "funeraries" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "image_url" character varying,
        "city" character varying NOT NULL,
        "neighbourhood" character varying NOT NULL,
        "street" character varying,
        "lat" numeric(10,7),
        "lng" numeric(10,7),
        "price" numeric(10,2) NOT NULL,
        "includes_casket" boolean NOT NULL DEFAULT false,
        "active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_funeraries" PRIMARY KEY ("id")
      )
    `)

    await queryRunner.query(`
      CREATE TYPE "body_location_type_enum" AS ENUM ('HOSPITAL', 'RESIDENCE', 'IML')
    `)

    await queryRunner.query(`
      CREATE TYPE "contract_status_enum" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')
    `)

    await queryRunner.query(`
      CREATE TABLE "contracts" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_id" uuid NOT NULL,
        "cemetery_id" uuid NOT NULL,
        "funerary_id" uuid NOT NULL,
        "body_location_type" "body_location_type_enum" NOT NULL,
        "body_city" character varying NOT NULL,
        "body_neighbourhood" character varying NOT NULL,
        "body_street" character varying,
        "body_uf" character varying,
        "body_number" integer,
        "funeral_city" character varying NOT NULL,
        "funeral_date" date NOT NULL,
        "death_certificate_url" character varying,
        "total_price" numeric(10,2) NOT NULL,
        "status" "contract_status_enum" NOT NULL DEFAULT 'PENDING',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_contracts" PRIMARY KEY ("id"),
        CONSTRAINT "FK_contracts_user" FOREIGN KEY ("user_id") REFERENCES "users"("id"),
        CONSTRAINT "FK_contracts_cemetery" FOREIGN KEY ("cemetery_id") REFERENCES "cemiteries"("id"),
        CONSTRAINT "FK_contracts_funerary" FOREIGN KEY ("funerary_id") REFERENCES "funeraries"("id")
      )
    `)

    await queryRunner.query(`
      CREATE TYPE "payment_method_enum" AS ENUM ('CREDIT_CARD', 'PIX', 'BOLETO')
    `)

    await queryRunner.query(`
      CREATE TYPE "payment_status_enum" AS ENUM ('PENDING', 'APPROVED', 'FAILED', 'REFUNDED')
    `)

    await queryRunner.query(`
      CREATE TABLE "payments" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "contract_id" uuid NOT NULL,
        "amount" numeric(10,2) NOT NULL,
        "method" "payment_method_enum" NOT NULL,
        "status" "payment_status_enum" NOT NULL DEFAULT 'PENDING',
        "paid_at" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_payments" PRIMARY KEY ("id"),
        CONSTRAINT "FK_payments_contract" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id")
      )
    `)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payments"`)
    await queryRunner.query(`DROP TYPE "payment_status_enum"`)
    await queryRunner.query(`DROP TYPE "payment_method_enum"`)
    await queryRunner.query(`DROP TABLE "contracts"`)
    await queryRunner.query(`DROP TYPE "contract_status_enum"`)
    await queryRunner.query(`DROP TYPE "body_location_type_enum"`)
    await queryRunner.query(`DROP TABLE "funeraries"`)
    await queryRunner.query(`DROP TABLE "cemiteries"`)
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
