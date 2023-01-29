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
const {
  createTables,
  insertTable,
  monitorTables,
} = require("./modules/sqlManager");
// createTables(connection, dbSchema);
monitorTables(connection, dbSchema);
// insertTable(commentData, dbSchema, connection);

// `;
// connection.query(selectQuery, function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
//   if (!results[0]?.password) {
//     // return res.send(false);
//   } else {
//     const hashedPassword = results[0]?.password;
//     console.log("hashedPassword ", hashedPassword);

//     // console.log( bcrypt.compareSync("1234", hashedPassword))
//     // // compare the plain-text password with the hashed password
//     bcrypt.compare("1234", hashedPassword, function (err, res) {
//       console.log("bcrypt checks passwords...");
//       if (res) {
//         console.log("password match");
//         // return res.send(true);
//       } else {
//         console.log("password not match");
//         // return res.send(false);
//       }
//     });
//   }
// });

const savePassword = async () => {
  bcrypt.hash("1234", 10, (err, hash) => {
    if (err) throw new Error("Coundn't encrypt the user password: ", err);

    const query = `
    INSERT INTO password(password, user_id) VALUES("${hash}",9);
    `;

    connection.query(query, (err) => {
      if (err) throw err;
      console.log("success");
    });
  });
};

// savePassword();

module.exports = app;
