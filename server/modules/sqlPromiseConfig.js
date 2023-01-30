const mysql = require("mysql2/promise");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "shopify",
});

module.exports = connection;
