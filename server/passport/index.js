const passport = require("passport");
const local = require("./localStrategy");
// const kakao = require("passport-kakao");
const { findUser } = require("../database/sql");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("SerializeUser Executed");
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("DeserializeUser Executed");
    findUser({ id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  // kakao();
};
