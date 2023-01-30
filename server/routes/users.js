const express = require("express");
const router = express.Router();
const connection = require("../modules/sqlConfig");

/* GET all users listing. */
router.get("/", function (req, res, next) {
  console.log("user list request");
  connection.query("SELECT * FROM user", (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
});

router.get("/:id", function (req, res, next) {
  console.log("user id request");
  connection.query(
    `SELECT * FROM user WHERE id = ${req.params.id}`,
    (err, data) => {
      if (err) throw err;
      if (data.length > 0) res.send(data[0]);
      else res.send("User not found");
    }
  );
});

router.get("/:id/:items", function (req, res, next) {
  console.log("user items request");

  const { id, items } = req.params;

  if (items === "posts" || items === "todos") {
    const item = items.slice(0, -1);
    console.log(item);

    connection.query(
      `SELECT * FROM ${item} WHERE user_id = ${id}`,
      (err, data) => {
        if (err) throw err;
        console.log(typeof data);
        if (data.length > 0) res.send(data);
        else res.send("User not found");
      }
    );
  } else {
    res.send("{}");
  }
});

module.exports = router;

/*
    SELECT *,
    CASE
        WHEN username = ${req.body.username} AND password = ${req.body.password} THEN 'true'
        ELSE 'false'
    END evaluation
    FROM
    user;
*/
