const connection = require("../modules/sqlConfig");
const bcrypt = require("bcrypt");
const sequelize = require("../modules/sequelizeConfig");

const login = {
  checkUser: async (username, password, cb) => {
    const responseObj = {};
    const selectQuery = `
       SELECT u.user_id, per.permission_level
       FROM user_password p
       JOIN user_info u
       ON u.user_id = p.user_id
       JOIN user_permission per
       ON u.user_id = per.user_id
       WHERE u.username = "${username}" and p.password = "${password}";
     `;
    connection.query(selectQuery, function (error, results) {
      if (error) {
        cb(false);
      }
      if (results.length > 0) {
        const token = Math.random() * Number.MAX_SAFE_INTEGER;
        responseObj.token = token;
        responseObj.permission_level = results[0].permission_level;
        connection.query(
          `UPDATE user_permission
                   SET token="${token}" WHERE user_id=${results[0].user_id}`,
          function (err, toke) {
            cb(responseObj);
            console.log(token, "erer");
          }
        );
      } else {
        cb(false);
      }
    });
  },
  validateUser: (username, password, cb) => {
    sequelize
      .transaction(async (transaction) => {
        try {
          const queryUsername = `SELECT user_id FROM user_info WHERE username = '${username}'`;
          const data1 = await sequelize.query(queryUsername, {
            transaction,
          });
          const user_id = data1[0][0]?.user_id;

          const queryPassword = `SELECT password FROM user_password WHERE user_id = '${user_id}'`;

          const data2 = await sequelize.query(queryPassword, {
            transaction,
          });

          const hashedPassword = data2[0][0]?.password;

          const isMatch = await bcrypt.compare(password, hashedPassword);

          console.log("isMatch ", isMatch);

          if (isMatch) {
            const queryToken = `SELECT token FROM user_permission WHERE user_id = '${user_id}'`;

            const token = await sequelize.query(queryToken, {
              transaction,
            });
            cb(token);
            console.log("user logged in successfully");
          } else {
            cb("something went wrong");
          }
        } catch (error) {
          await transaction.rollback();
          throw error;
        }
      })
      .catch((error) => {
        cb(error.message);
      });
  },
};

module.exports = login;
