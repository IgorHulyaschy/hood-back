START TRANSACTION;
  create table users_data(
    id serial PRIMARY KEY ,
    fname varchar NOT NULL ,
    lname varchar NOT NULL ,
    login varchar NOT NULL ,
    email varchar NOT NULL

  );

COMMIT;