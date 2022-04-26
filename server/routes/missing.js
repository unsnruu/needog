const express = require("express");
const router = express.Router();

const { isLoggedIn, writePost, initPost } = require("./middlewares");
const {
  createPost,
  getPostsByPetLoc,
  getPostById,
} = require("../database/sql");
const { getTableName } = require("../common");

router.post("/write", isLoggedIn, writePost);

router.post("/board/init", initPost);

router.post("/post/:id", async (req, res) => {
  const table = getTableName(req.baseUrl);
  const { id } = req.params;

  try {
    const post = await getPostById({ table, id });
    res.send(post);
  } catch (err) {
    console.log("Error on /post/:id router");
  }
});

module.exports = router;
