START TRANSACTION;
  ALTER TABLE "users_data" DROP COLUMN "phone";
  ALTER TABLE "users_data" DROP COLUMN "country";
  ALTER TABLE "users_data" DROP COLUMN "stack";
  ALTER TABLE "users_data" DROP COLUMN "rate";
COMMIT;
