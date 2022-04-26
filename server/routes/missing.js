const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("./middlewares");
const {
  createPost,
  getPostsByPetLoc,
  getPostById,
} = require("../database/sql");
const { getTableName } = require("../common");

router.post("/write", isLoggedIn, async (req, res) => {
  const author = req.user.userId;
  const table = getTableName(req.baseUrl);
  const post = {
    ...req.body,
    author,
    table,
  };

  try {
    await createPost(post);
    res.send("성공적으로 포스트를 만들었습니다.");
  } catch (error) {
    console.log(error);
    throw new Error(`Error on ${table}/write`);
  }
});

router.post("/board/init", async (req, res) => {
  const table = getTableName(req.baseUrl);
  //init의 경우 이미지, title, author, tinytext만 필요함
  try {
    const results = await getPostsByPetLoc({
      pet: null,
      sido: null,
      sigungu: null,
      table,
    });
    res.send(
      results.map(({ id, title, author }) => ({
        id,
        title,
        author,
      }))
    );
  } catch (err) {
    console.log("Error on /board/init");
    throw new Error(err);
  }
});

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
