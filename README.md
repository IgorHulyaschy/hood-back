# HOOD - from english slang language "район, местность"
## Watch the app: [Click here](https://koa-project-hood.herokuapp.com/)

### Routs for db requests:
```javascript
requestRouter.post("createUser", Validator.signUp, UsersController.createUser);
requestRouter.post("logIn", Validator.signIn, UsersController.logIn);
requestRouter.get(
  "profileAuth",
  passport.authenticate("jwt", { session: false }),
  UsersController.profileAuth
);
requestRouter.get("refresh", UsersController.refresh);
requestRouter.get(
  "list",
  passport.authenticate("jwt", { session: false }),
  UsersController.userList
);
requestRouter.post(
  "updateCategory",
  Validator.updateCategory,
  UsersController.updateCategory
);
requestRouter.delete("deleteUser/:userId", UsersController.deleteUser)
);
```
