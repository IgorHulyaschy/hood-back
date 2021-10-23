const crypto = require("crypto");
const config = require('config')
const { User } = require("./User");
const db = require("../../db/db");

class UserDB {
  static async getUserById(id) {
    const userResponse = await db.query(
      `SELECT * FROM "users_data" WHERE id = ${id}`
    );

    if (!userResponse.rowCount) {
      throw new Error(`User with id: ${id}, does not exist`);
    }

    return new User(userResponse.rows[0]);
  }

  static async getUserByEmail(email) {
    const userResponse = await db.query(
      `SELECT * FROM "users_data" WHERE email = '${email}'`
    );
    if (!userResponse.rowCount) {
      throw new Error("User does not exist");
    }
    return new User(userResponse.rows[0]);
  }

  static async checkPassword(email, password) {
    const userResponse = await db.query(
      `SELECT * FROM "users_data" WHERE email = '${email}'`
    );
    if (!userResponse.rowCount) {
      return {
        flag: false,
        message: `User with email: '${email}' does not exist`,
      };
    }
    const user = { ...userResponse.rows[0] };

    const passwordHash = crypto
      .pbkdf2Sync(password, "salt", 100000, 64, "sha256")
      .toString("hex");

    if (user.password !== passwordHash) {
      return { message: "Incorect password", flag: false };
    }
    return { user: new User(user), flag: true };
  }

  static async userList() {
    const userListResponse = await db.query(`
    SELECT users_data.id, fname, lname, login, email, category.name, stack, rate, country, photo
    FROM "users_data"
    JOIN category
    ON users_data.categoryId = category.id
    `);
    
    const users = userListResponse.rows.map((userDb) => new User(userDb));
    users.forEach(item => {
      if(item.photo === null){
        item.photo = config.get('defaultAvatar')
      }
    });
    return users;
  }
  static async createUser(fname, lname, login, email, password) {
    const passwordHash = crypto
      .pbkdf2Sync(password, "salt", 100000, 64, "sha256")
      .toString("hex");

    const createUserResponse = await db
      .query(
        `INSERT INTO "users_data" (fname, lname, login, email, password) 
        VALUES ('${fname}', '${lname}', '${login}', '${email}', '${passwordHash}') RETURNING *`
      )
      .catch((err) => {
        if (err.constraint === "user_email") {
          const error = new Error("User with the same email already exists");
          error.status = 400;
          throw error;
        }
        throw new Error(err.message);
      });
    return new User(createUserResponse.rows[0]);
  }

  static async deleteUser(userId) {
    console.log(userId)
    const user = await db.query(
      `DELETE FROM users_data WHERE id = ${userId} RETURNING *`
    );
    console.log(user)
    if (!user.id) {
      return {
        message: "User with this id does not exist"
      }
    }
    return {
      message: "DELETED",
    };
  }
  static async updatePassword(email, password){
    const passwordHash = crypto
      .pbkdf2Sync(password, "salt", 100000, 64, "sha256")
      .toString("hex");

    const user = await db.query(
      `UPDATE users_data
      SET password = '${passwordHash}'
      WHERE email = '${email}' RETURNING *`
    )
    return new User({...user.rows[0]})
  }

  static async updateCategory(categoryid, email) {
    await db.query(`     
      UPDATE users_data
      SET categoryId = ${categoryid} 
      WHERE email = '${email}';`);

    const category = await db.query(`
      SELECT name
      FROM category
      JOIN users_data
      ON users_data.categoryId = category.id
      WHERE email = '${email}';`);
    if (!category.rowCount) {
      return { message: "Inccorect email" };
    }
    return { ...category.rows[0] };
  }
  static async getCategory(email){
    const category = await db.query(`
      SELECT name
      FROM category
      JOIN users_data
      ON users_data.categoryId = category.id
      WHERE email = '${email}'`)
      return { ...category.rows[0] }
  }

  static async getUser(email) {
    const responseData = await db.query(`
      SELECT *
      FROM users_data
      WHERE email = '${email}'
    `)
    const user = {...responseData.rows[0]}
    if(user.photo === null) {
      user.photo = config.get('defaultAvatar')
    }
    return new User(user)

  }
  static async searchUser(search, country, categoryId, stack){

    const result = await db.query(`
      SELECT fname, lname, country, stack, rate, photo, email
      FROM users_data
      WHERE users_data.categoryId = ${categoryId} 
      AND CONCAT (fname, ' ', lname) ILIKE  '%${search}%' 
      ${stack ? `AND stack ILIKE '%${stack}%'` : ''}
      ${country ?  `AND country ILIKE '%${country}%'` : ''}
    `)
    const users = result.rows.map((user) => new User(user));
    users.forEach(item => {
      if(item.photo === null) {
        item.photo = config.get('defaultAvatar')
      }
    })
    return users;
    
  }

  static async updateProfile(fname, lname, login, categoryId, phone, country, stack, rate, email){
    const user = await db.query(`
    UPDATE users_data
    SET fname = '${fname}',
    lname = '${lname}', 
    login = '${login}', 
    phone = '${phone}', 
    country = '${country}', 
    stack = '${stack}',
    categoryId = ${categoryId},
    rate= ${rate}
    WHERE email = '${email}' RETURNING *
    `)
    return new User({...user.rows[0]})
  }

  static async updateUserPhoto(photoUrl, email) {
    await db.query(`
      UPDATE "users_data" SET photo = '${photoUrl}'
      WHERE email = '${email}'
    `);
  }
}
module.exports = {
  UserDB,
};
