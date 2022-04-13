const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

const app = express();
const passportConfig = require("./passport");
const fileStoreOptions = {
  // path: "./sessions",
  // reapInterval: 10,
};

dotenv.config();
passportConfig();
app.set("port", process.env.PORT || 8000);
app.set("build-path", path.join(__dirname, "..", "client", "build"));

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const missingRouter = require("./routes/missing");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(app.get("build-path")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
    store: new FileStore(fileStoreOptions),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ credentials: true, origin: true }));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/missing", missingRouter);

//Todo
/* 
"(GET)/auth/logout"처럼
 get으로 설정된 경우 아래 구문을 피할 수 있음.
  모두 post로 설정을 바꿔야 할 지도?
*/

app.get("/*", (req, res) => {
  res.sendFile(app.get("build-path") + "/index.html");
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번에서 서버 대기중`);
});
