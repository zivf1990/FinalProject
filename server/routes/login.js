const express = require("express");
const router = express.Router();
const connection = require("../modules/sqlConfig");
const bcrypt = require("bcrypt");

router.post("/", function (req, res, next) {
  console.log("user login request");

  const { username, password } = req.body;

  // get the hashed password from the database.
  const selectQuery = `
  SELECT p.password, u.id
  FROM password p
  JOIN user u
  ON u.id = p.user_id
  WHERE u.username = "${username}";

`;
  connection.query(selectQuery, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    if (!results[0]?.password) {
      return res.json({ result: false });
    } else {
      const hashedPassword = results[0]?.password;
      // // compare the plain-text password with the hashed password
      bcrypt.compare(password, hashedPassword, function (err, response) {
        if (response) {
          console.log("password match");
          return res.json({ result: true, userId: results[0]?.id });
        } else {
          console.log("password not match");
          return res.json({ result: false });
        }
      });
    }
  });
});

module.exports = router;
