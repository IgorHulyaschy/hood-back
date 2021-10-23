START TRANSACTION;
  ALTER TABLE "users_data" DROP COLUMN "password";
  ALTER TABLE "users_data" DROP CONSTRAINT user_email;
COMMIT;