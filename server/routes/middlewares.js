const { getTableName } = require("../common");
const {
  createPost,
  getPostsByPetLoc,
  getPostById,
} = require("../database/sql");

exports.isLoggedIn = (req, res, next) => {
  console.log("isLoggedIn executed");
  if (req.isAuthenticated()) {
    console.log("Yes. Logged In");
    next();
  } else {
    console.log("No. Not Logged In");
    res.status(404).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  console.log("isNotLoggedIn executed");
  if (!req.isAuthenticated()) {
    console.log("No, Not Logged In");
    next();
  } else {
    console.log("Yes, Already Logged In");
    const message = "로그인한 상태입니다.";
    res.send(message);
  }
};

exports.writePost = async (req, res) => {
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
};

exports.initPost = async (req, res) => {
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
    console.log("Error on care/board/init");
    throw new Error(err);
  }
};

exports.sendPostById = async (req, res) => {
  const table = getTableName(req.baseUrl);
  const { id } = req.params;

  try {
    const post = await getPostById({ table, id });
    console.log(post);
    res.send(post);
  } catch (err) {
    console.log("Error on /post/:id router");
  }
};
