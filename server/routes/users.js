const express = require("express");
const { bringAllUsers, changeUserPermission } = require("../db/usersQuery");
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
  const { user_id, permission_level } = req.user;

  sequelize
    .transaction(async (transaction) => {

      const queryUserInfo = `
      SELECT * FROM user_info
      WHERE user_id = "${user_id}";

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


router.get("/notAdmin", function (req, res, next) {
  console.log("hello");
  bringAllUsers((response) => {
    console.log("response:: ", response);
    if (response.data) {
      res.status(200).json(response);
    } else {
      console.log("failed to login");
      res.status(401).send(response);
    }
  });
});
router.put("/userPermission", function (req, res, next) {
  changeUserPermission(req.body.user_id,(response) => {
    if (response.data) {
      res.status(200).json(response);
    } else {
      console.log("failed to login");
      res.status(401).send(response);
    }
  });
});



module.exports = router;
