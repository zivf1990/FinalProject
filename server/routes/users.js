const express = require("express");
const { bringAllUsers } = require("../db/usersQuery");
const router = express.Router();
const sequelize = require("../modules/sequelizeConfig");
const connection = require("../modules/sqlConfig");

/* GET all users listing. */
// router.get("/", function (req, res, next) {
//   console.log("user list request");
//   connection.query("SELECT * FROM user", (err, data) => {
//     if (err) throw err;
//     console.log(data);
//     res.send(data);
//   });
// });

router.get("/profile", function (req, res, next) {
  console.log("user profile request");

  const token = req.token;

  console.log("token ", req.token);

  sequelize
    .transaction(async (transaction) => {
      const queryUserId = `
      SELECT * FROM user_permission
      WHERE token = "${token}";

      `;

      const data1 = await sequelize.query(queryUserId, {
        transaction,
      });

      const userId = data1[0][0].user_id;

      console.log("userId:::", userId);

      const queryUserInfo = `
      SELECT * FROM user_info
      WHERE user_id = "${userId}";

      `;
      const data2 = await sequelize.query(queryUserInfo, {
        transaction,
      });

      console.log(data2);

      const { name, username, address, user_picture, email, created_at } =
        await data2[0][0];

      console.log(username, name, address, user_picture, email, created_at);
      res.json({
        name,
        username,
        address,
        user_picture,
        email,
        created_at,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

router.get("/:id", function (req, res, next) {
  console.log("user id request");
  connection.query(
    `SELECT * FROM user_info WHERE id = ${req.params.id}`,
    (err, data) => {
      if (err) throw err;
      if (data.length > 0) res.send(data[0]);
      else res.send("User not found");
    }
  );
});

// router.get("/notAdmin", function (req, res, next) {
//   console.log("hello");

//   bringAllUsers((response) => {
//     console.log("response:: ", response);
//     if (response.data) {
//       res.status(200).json(response);
//     } else {
//       console.log("failed to login");
//       res.status(401).send(response);
//     }
//   });
// });

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
