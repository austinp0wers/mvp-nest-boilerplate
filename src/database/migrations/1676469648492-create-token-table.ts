import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTokenTable1676469648492 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE user_token
        (
            "id" uuid NOT NULL DEFAULT gen_random_uuid(),
            "user_id" VARCHAR(255) NOT NULL, 
            "refresh_token" VARCHAR(1024) NOT NULL,
            "expire_at" TIMESTAMP NOT NULL,
            "created_at" TIMESTAMP  NOT NULL DEFAULT now()
        );

        ALTER TABLE user_token
            ALTER COLUMN user_id TYPE uuid USING user_id::uuid;

        ALTER TABLE user_token
            ADD CONSTRAINT fk_user_token_user
            FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE;
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user_token;`);
  }
}
