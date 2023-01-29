const mysql = require("mysql2");
const Sequelize = require("sequelize");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "shopify",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("mysql connected successfully");
});


const sequelize = new Sequelize("shopify", "root", "z10mz10m", {
  host: "localhost",
  dialect: "mysql",
});

module.exports.connection = connection;
module.exports.sequelize = sequelize;
