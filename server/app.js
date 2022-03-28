const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const app = express();

app.set("port", process.env.PORT || 8000);
dotenv.config();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  })
);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번에서 서버 대기중`);
});
