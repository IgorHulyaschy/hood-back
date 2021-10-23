START TRANSACTION;
  create table category(
    id serial PRIMARY KEY ,
    name varchar NOT NULL
  );

  INSERT INTO category (name) VALUES ('Front-end');
  INSERT INTO category (name) VALUES ('Back-end');
  INSERT INTO category (name) VALUES ('BA');
  INSERT INTO category (name) VALUES ('Project manager');
  ALTER TABLE "users_data" ADD COLUMN categoryId int DEFAULT 1;
  ALTER TABLE "users_data" ADD CONSTRAINT fk_category FOREIGN KEY (categoryId) REFERENCES category(id); 

COMMIT;