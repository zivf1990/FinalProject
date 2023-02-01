const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sequelize = require("../modules/sequelizeConfig");

//login request.
router.post("/", (req, res) => {
  const { username, password } = req.body;
  console.log("username", username);
  console.log("password", password);
  //check if the username and the password are correct.
  sequelize
    .transaction(async (transaction) => {
      try {
        const result1 = await sequelize.query(
          `SELECT user_id FROM user_info WHERE username = '${username}'`,
          {
            transaction,
          }
        );
        const user_id = result1[0][0]?.user_id;

        const result2 = await sequelize.query(
          `SELECT password FROM user_password WHERE user_id = '${user_id}'`,
          {
            transaction,
          }
        );

        const hashedPassword = result2[0][0]?.password;

        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (isMatch) {
          const result3 = await sequelize.query(
            `
            SELECT permission_level FROM user_permission WHERE user_id = ${user_id};`,
            {
              transaction,
            }
          );

          const permission_level = result3[0][0]?.permission_level;

          // create a JWT token
          const token = jwt.sign(
            { user_id, permission_level: permission_level },
            "secret-key"
          );

          // store the token and session ID in the database
          const sessionID = `${username}-${Date.now()}`;

          console.log("token ", token);
          console.log("sessionID ", sessionID);
          console.log("user_id ", user_id);

          await sequelize.query(
            `UPDATE user_permission
            SET token = "${token}", sessionID = "${sessionID}"
            WHERE user_id = ${user_id};`,
            {
              transaction,
            }
          );

          await sequelize.query(
            `UPDATE user_info
            SET updated_at = CURRENT_TIMESTAMP
            WHERE user_id = ${user_id};`,
            {
              transaction,
            }
          );

          // send the session ID to the client
          res.status(200).send({ sessionID, permission_level });
          console.log("user logged in successfully");
          console.log("sessionID", sessionID);
        } else {
          return res.status(500).send({ error: "something went wrong" });
        }
      } catch (error) {
        await transaction.rollback();
        return res.status(500).send({ error });
      }
    })
    .catch((error) => {
      return res.status(500).send({ error });
    });
});

module.exports = router;
