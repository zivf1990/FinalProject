//imports.
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const checkReqToken = require("./middleware/checkReqToken");

//import routers.
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");

//initialize express.
const app = express();
const createUser = require("./db/signupQuery");

//middlewares.
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
app.use(checkReqToken);

//Using Routers
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", signupRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);

//import mysql connection and dbSchema.
const connection = require("./modules/sqlConfig");
const dbSchema = require("./db/dbScheme");
const { createTables, createDatabase } = require("./modules/sqlManager");
// createTables(connection, dbSchema);

const triggerTableProduct2 = `
CREATE TRIGGER update_seller_name 
AFTER INSERT ON product
FOR EACH ROW
BEGIN
  UPDATE product p
  JOIN user_info u ON p.seller_id = u.user_id
  SET p.seller_name = u.username
  WHERE p.product_id = NEW.product_id;
END;`;

const triggerTableProduct1 = `
  CREATE TRIGGER update_product_amount
    AFTER INSERT ON purchase_history
    FOR EACH ROW
    BEGIN
      UPDATE product
      SET amount = amount - NEW.purchase_amount
      WHERE id = NEW.product_id;
    END;`;

const defaultValueQuery = `ALTER TABLE user_info
    MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`;

// connection.query(defaultValueQuery, (err, result) => {
//   if (err) console.log(err);
//   console.log(result);
// });

module.exports = app;
