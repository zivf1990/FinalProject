//imports.
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");

//import routers.
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const todosRouter = require("./routes/todos");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const loginRouter = require("./routes/login");
// const signupRouter = require("./routes/signup");

//initialize express.
const app = express();
const createUser = require("./db/signupQuery");

//Settings.
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Using Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/todos", todosRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/login", loginRouter);
// app.use("/signup", signupRouter);

//import mysql connection and dbSchema.
const connection = require("./modules/sqlConfig");
const dbSchema = require("./db/dbScheme");
const { createTables, createDatabase } = require("./modules/sqlManager");
// createTables(connection, dbSchema);

// createUser(
//   "ofeko",
//   "1234",
//   "zzzzz@gmail.com",
//   "jerusalem",
//   "password1", (data)=>{
//     if(data){
//       console.log(data)
//     }
//     else{
//       console.log(false);
//     }
//   }
// );

module.exports = app;
