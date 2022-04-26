const express = require("express");
const router = express.Router();

const {
  isLoggedIn,
  writePost,
  initPost,
  sendPostById,
} = require("./middlewares");

router.post("/write", isLoggedIn, writePost);
router.post("/board/init", initPost);
router.post("/post/:id", sendPostById);

module.exports = router;
