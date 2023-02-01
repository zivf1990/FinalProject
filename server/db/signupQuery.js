const { saveEncryptPassword } = require("../modules/encryption");
const sequelize = require("../modules/sequelizeConfig");
const jwt = require("jsonwebtoken");

const createUser = async (username, password, email, name, address, cb) => {
  sequelize.transaction(async (transaction) => {
    try {
      const emailCheck = await sequelize.query(
        `
          SELECT email FROM user_info WHERE email = '${email}'
        `,
        { transaction }
      );

      if (emailCheck[0].length) {
        cb({ message: "Email already exists", status: 400 });
      }

      const usernameCheck = await sequelize.query(
        `
          SELECT username FROM user_info WHERE username = '${username}'
        `,
        { transaction }
      );

      if (usernameCheck[0].length) {
        cb({ message: "Username already exists", status: 400 });
      }

      const userInfoQuery = `INSERT INTO user_info (name, username, email,address, updated_at)
        VALUES("${name}", "${username}", "${email}", "${address}", CURRENT_TIMESTAMP);`;

      const result1 = await sequelize.query(userInfoQuery, { transaction });
      console.log(result1);

      const userId = await result1[0];

      const encryptPassword = await new Promise((resolve) => {
        saveEncryptPassword(password, resolve);
      });

      const passwordQuery = `INSERT INTO user_password(password, user_id) VALUES("${encryptPassword}", ${userId})`;

      await sequelize.query(passwordQuery, { transaction });

      // create a JWT token
      const token = jwt.sign(
        { user_id: userId, permission_level: "user" },
        "secret-key"
      );

      // store the token and session ID in the database
      const sessionID = `${username}-${Date.now()}`;

      const permissionQuery = `
        INSERT INTO user_permission(user_id, permission_level , token, sessionID)
        VALUES( ${userId}, "user", "${token}", "${sessionID}")`;

      await sequelize.query(permissionQuery, { transaction });

      console.log("User Created");
      // send the session ID to the client
      cb({
        message: "User Created",
        sessionID,
        permission_level: "user",
        status: 201,
      });
    } catch (error) {
      await transaction.rollback();
      cb({ message: "something went wrong", status: 500 });
    }
  });
};

module.exports = createUser;
