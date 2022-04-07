exports.isLoggedIn = (req, res, next) => {
  console.log("isLoggedIn executed");
  console.log("session", req.session);
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
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};
