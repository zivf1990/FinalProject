const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "typicode",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("mysql connected successfully");
});

module.exports = connection;
