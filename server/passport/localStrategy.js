const passport = require("passport");
const LocalStrategy = require("passport-local");
const bycrypt = require("bcrypt");
const { findUser } = require("../database/sql");

const strategy = new LocalStrategy(
  { usernameField: "id", passwordField: "pwd" },
  async (id, password, done) => {
    console.log("LocalStrategy has executed");
    try {
      const user = await findUser({ userId: id });
      if (user) {
        const result = await bycrypt.compare(password, user.password);
        if (result) {
          done(null, user);
        } else {
          done(null, false, { message: "비밀번호가 일치하지 않습니다." });
        }
      } else {
        done(null, false, { message: "가입되지 않은 회원입니다." });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
);

module.exports = () => {
  passport.use(strategy);
};
