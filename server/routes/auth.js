const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const { findUser, createUser } = require("../database/sql");
const router = express.Router();

router.post("/signup", isNotLoggedIn, async (req, res, next) => {
  const { userId, nickname, pwd } = req.body;

  try {
    const exUser = await findUser({ userId });
    console.log("exUser", exUser);
    if (exUser.length) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(pwd, 12);
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
      console.log("Authenticate Error");
      console.error(error);
      return next(error);
    }

    if (!user) {
      console.log("No user has found");
      return;
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      } else {
        return res.send(user);
      }
    });
  })(req, res, next);
});

router.get("/signintest", isLoggedIn, (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.json("세션 없음");
  }
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.clearCookie("connect.sid", { httpOnly: true }).status(200).send();
});

module.exports = router;
