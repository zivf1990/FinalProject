//imports.
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const sessionIDcheck = require("./middleware/sessionIDcheck");

//import routers.
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");
const purchaseHistoryRouter = require("./routes/purchaseHistory");
const createUser = require("./db/signupQuery");

//initialize express.
const app = express();

//middlewares.
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(sessionIDcheck);

//Using Routers
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", signupRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/purchasehistory", purchaseHistoryRouter);

//import mysql connection and dbSchema.
const connection = require("./modules/sqlConfig");
const dbSchema = require("./db/dbScheme");
const { createTables, createDatabase } = require("./modules/sqlManager");
// createTables(connection, dbSchema);

let values = [[1, 15, 1, "CURRENT_TIMESTAMP"]];

// let query = `
// INSERT INTO purchase_history (user_id, product_id, purchase_amount, purchase_date)
// VALUES (1, 8,1,CURRENT_TIMESTAMP)`;

const triggerTableProduct = `
CREATE TRIGGER update_product_amount
AFTER INSERT ON purchase_history
FOR EACH ROW
BEGIN
  UPDATE product
  SET amount = amount - NEW.purchase_amount
  WHERE product_id = NEW.product_id;
END;`;

const defaultValueQuery = `ALTER TABLE user_info
MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`;

// connection.query(triggerTableProduct ,  (err, result) => {
//   if (err) console.log(err);
//   console.log(result);
// });

module.exports = app;
