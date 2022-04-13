const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("./middlewares");

router.post("/post", (req, res) => {
  const { pet, location, region } = req.body;

  res.send();
});

router.post("/write", isLoggedIn, (req, res) => {
  const { title, text } = req.body;
});

module.exports = router;
