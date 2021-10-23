const jwt = require("jwt-simple");
const passport = require("koa-passport");
const config = require('config')
const { UserDB } = require("./models/UserDB");
const AWSS3 = require('../utils/uploadS3');

class UsersController {
  static async createUser(ctx) {
    const { fname, lname, login, email, password } = ctx.request.body;
    console.log({ fname, lname, login, email, password })
    ctx.status = 201;
    ctx.body = (
      await UserDB.createUser(fname, lname, login, email, password)
    ).getCreatedUser();
  }

  static async deleteUser(ctx) {
    const {id}  = ctx.request.body;
    console.log(id)
    ctx.status = 204;
    ctx.body = (
      await UserDB.deleteUser(id)
    )
  }
  static async updatePassword(ctx){
    const {email, password} = ctx.request.body;
    
    ctx.body = (
      await UserDB.updatePassword(email, password)
    )
    
  }

  static async logIn(ctx) {
    await passport.authenticate("local", (err, user) => {
      if (user) {
        ctx.body = user;
      } else {
        ctx.status = 400;
        if (err) {
          ctx.body = { error: err };
        }
      }
    })(ctx);
  }

  static async profileAuth(ctx) {
    const name = await UserDB.getCategory(ctx.state.user.email)
    if(ctx.state.user.photo === null){
      ctx.state.user.photo = config.get('defaultAvatar')
    }
    
    ctx.body = {
      user: ctx.state.user,
      name: name,
    };
  }

  static async updateCategory(ctx) {
    const { categoryid, email } = ctx.request.body;
    ctx.body = (
      await UserDB.updateCategory(categoryid, email)
    )
  }

  static async updateProfileInfo(ctx){
    
    const { fname, lname, login, categoryId, phone, country, stack, rate} = ctx.request.body;
    ctx.body = (
      await UserDB.updateProfile(fname, lname, login, categoryId, phone,  country, stack, rate, ctx.state.user.email)
    )
  }

  static async search(ctx){
    const {search, country, categoryId, stack} = ctx.request.body;
    const users = ( await UserDB.searchUser(search, country, categoryId, stack)).map((user) => user.getInfo())
    ctx.body = {
      users
    }
  }
  static async getUser(ctx){
    const {email} = ctx.request.params
    console.log(email)
    ctx.body = (
      await (await UserDB.getUser(email)).getInfo()
    )
  }

  static async refresh(ctx) {
    const token = ctx.headers.authorization.split(" ")[1];
    const decodedToken = jwt.decode(token, "secret");

    if (decodedToken.expiresIn <= new Date().getTime()) {
      const error = new Error(
        "Refresh roken expired, please sign in into ur account"
      );
      error.status = 400;

      throw error;
    }
    const user = await UserDB.getUserByEmail(decodedToken.email);

    const accessToken = {
      id: user.id,
      expiresIn: new Date().setTime(new Date().getTime() + 200000),
    };

    const refreshToken = {
      email: user.email,
      expiresIn: new Date().setTime(new Date().getTime() + 1000000),
    };
    ctx.body = {
      accessToken: jwt.encode(accessToken, config.get('jwt.accessTokenPayload')),
      accessTokenExpirationDate: accessToken.expiresIn,
      refreshToken: jwt.encode(refreshToken, config.get('jwt.refreshTokenPayload')),
      refreshTokenExpirationDate: refreshToken.expiresIn,
    };
  }

  static async userList(ctx) {
    const users = (await UserDB.userList()).map((user) => user.getConsoleInfo());

    ctx.body = {
      users,
    };
  }

  static async updatePhoto(ctx) {
    const {photo} = ctx.request.body
    console.log(ctx.request.body)
    const photoUrl = await AWSS3.uploadS3(photo, 'users', `${ctx.state.user.email}'s_photos`);
    
    
    await UserDB.updateUserPhoto(photoUrl, ctx.state.user.email);
    ctx.body = { photoUrl };
  }
  static async checkEmail(ctx){
    const {email} = ctx.request.body
    ctx.body = (
      await UserDB.getUserByEmail(email)
    ) 
  }
}

module.exports = { UsersController };
