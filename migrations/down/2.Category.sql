START TRANSACTION;
  ALTER TABLE "users_data" DROP CONSTRAINT fk_category;
  ALTER TABLE "users_data" DROP categoryId;

  DROP TABLE category
COMMIT;