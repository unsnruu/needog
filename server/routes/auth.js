const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const { findUser, createUser } = require("../database/sql");
const router = express.Router();

router.post("/signup", isNotLoggedIn, async (req, res, next) => {
  const { userId, nickname, password } = req.body;

  try {
    const exUser = await findUser({ userId });

    if (exUser) return res.status(404).send();

    const hash = await bcrypt.hash(password, 12);
    await createUser({ userId, nickname, password: hash });
    res.send("success");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      console.log("Login Authentication Error");
      console.error(error);
      return next(error);
    }

    if (!user) {
      console.log("No user has found");
      return res.status(404).send(null);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      } else {
        const { userId, nickname, email, snsId } = user;
        return res.send({ userId, nickname, email, snsId });
      }
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res
    .clearCookie("connect.sid", { httpOnly: true })
    .status(200)
    .send("성공적으로 로그아웃 되었습니다.");
});

module.exports = router;
