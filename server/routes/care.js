const express = require("express");
const router = express.Router();

const { isLoggedIn, initPost, writePost } = require("./middlewares");

router.post("/write", isLoggedIn, writePost);
router.post("/board/init", initPost);

module.exports = router;
