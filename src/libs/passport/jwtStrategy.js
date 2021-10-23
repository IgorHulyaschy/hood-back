const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const config = require('config')

const { UserDB } = require("../../user/models/UserDB");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: config.get('jwt.secretOrKey'),
};

module.exports = new JwtStrategy(opts, (jwtPayload, done) => {
  if (jwtPayload.expiresIn <= new Date().getTime()) {
    done({ isPassport: true, message: "Expired access token." }, false);
  }

  UserDB.getUserById(jwtPayload.id)
    .then((user) => done(null, user.getInfo()))
    .catch((err) => done({ isPassport: true, message: err.message }, false));
});
