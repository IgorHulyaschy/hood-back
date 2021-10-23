const Router = require("koa-joi-router");
const passport = require("koa-passport");

const { UsersController } = require("./controller");
const Validator = require("./validator");

const requestRouter = new Router();

requestRouter.post("user/create", Validator.signUp, UsersController.createUser);
requestRouter.post("logIn", Validator.signIn, UsersController.logIn);
requestRouter.get(
  "user/profile",
  passport.authenticate("jwt", { session: false }),
  UsersController.profileAuth
);
requestRouter.get("refresh", UsersController.refresh);
requestRouter.get(
  "user/list",
  // passport.authenticate("jwt", { session: false }),
  UsersController.userList
);
requestRouter.post(
  "user/category",
  Validator.updateCategory,
  UsersController.updateCategory
);
requestRouter.delete("user/delete",  UsersController.deleteUser)
requestRouter.put('user/photo',   passport.authenticate("jwt", { session: false }), UsersController.updatePhoto)
requestRouter.put('user/password', UsersController.updatePassword)
requestRouter.post('user/email', UsersController.checkEmail)
requestRouter.put('user/profile', passport.authenticate("jwt", { session: false }), UsersController.updateProfileInfo)
requestRouter.post('user/search', UsersController.search)
requestRouter.get('user/profile/:email', UsersController.getUser)
module.exports = requestRouter;
