const { saveEncryptPassword } = require("../modules/encryption");
const sequelize = require("../modules/sequelizeConfig");
const { generateToken } = require("../modules/token");

const createUser = async (username, password, email, name, address, cb) => {
  sequelize
    .transaction(async (transaction) => {
      try {
        const userInfoQuery = `INSERT INTO user_info (name, username, email,address) 
      VALUES("${name}", "${username}", "${email}", "${address}");`;

        const result1 = await sequelize.query(userInfoQuery, { transaction });
        console.log(result1);

        const userId = await result1[0];

        const encryptPassword = await new Promise((resolve) => {
          saveEncryptPassword(password, resolve);
        });

        const passwordQuery = `INSERT INTO user_password(password, user_id) VALUES("${encryptPassword}", ${userId})`;

        await sequelize.query(passwordQuery, { transaction });

        const token = await generateToken();

        const permissionQuery = `INSERT INTO user_permission(user_id, permission_level , token)
        VALUES( ${userId}, "user", "${token}")`;

        await sequelize.query(permissionQuery, { transaction });

        console.log("User Created");
        cb({ message: "User Created", token });
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    })
    .catch((error) => {
      cb({ message: error.message, token: undefined });
    });
};

module.exports = createUser;
