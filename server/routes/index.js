const express = require("express");

const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.get("/init", isLoggedIn, (req, res) => {
  const { userId, nickname, snsId } = req.user;
  res.send({ userId, nickname, snsId });
});

module.exports = router;
