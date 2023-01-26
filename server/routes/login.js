const express = require("express");
const router = express.Router();

router.post("/", function (req, res, next) {
  console.log("user id request");
  connection.query(
    `
      SELECT u.id,u.name,u.address
      FROM user u
      JOIN password p
      ON u.id = p.user_id
      WHERE u.username = ${req.body.username} AND p.password = ${req.body.password};
    `,
    (err, data) => {
      if (err) throw err;
      if (data.length > 0) res.send(data[0].id);
      else res.send("User not found");
    }
  );
});

module.exports = router;
/*
const hashedPassword = await bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw new Error("Coundn't encrypt the user password: ", err);
        return hash;
      });
*/
