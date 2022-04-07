const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");

const app = express();
const passportConfig = require("./passport");
const fileStoreOptions = {
  // path: "./sessions", reapInterval: 10
};

dotenv.config();
passportConfig();
app.set("port", process.env.PORT || 8000);

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // maxAge: 1000 * 30,
    },
    store: new FileStore(fileStoreOptions),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ credentials: true, origin: true }));

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번에서 서버 대기중`);
});
