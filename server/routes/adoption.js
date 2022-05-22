const express = require("express");
const router = express.Router();

const {
  isLoggedIn,
  writePost,
  getAllCard,
  sendPostById,
} = require("./middlewares");

router.post("/write", isLoggedIn, writePost);
router.post("/board/getAllCard", getAllCard);
router.post("/post/:id", sendPostById);

module.exports = router;
