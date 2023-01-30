const bcrypt = require("bcrypt");
const sequelize = require("../modules/sequelizeConfig");

const token = {
  generateToken: async () => {
    const random = Math.floor(Math.random() ** Number.MAX_VALUE);
    const saltRounds = 10;
    const hash = await bcrypt.hash(random.toString(), saltRounds);

    sequelize.query(`
    SELECT COUNT(*)
    FROM user_permission
    WHERE token = '${hash}';`);

    return hash;
  },
  removeToken: (token, cb) => {
    sequelize.query(
      `
    UPDATE user_permission
    SET token = null 
    WHERE token = "${token}"
    `,
      (err, data) => {
        if (err) console.log(err);
        cb(data);
      }
    );
  },
};

// const savePassword = async () => {
//   bcrypt.hash("1234", 10, (err, hash) => {
//     if (err) throw new Error("Coundn't encrypt the user password: ", err);

//     const query = `
//       INSERT INTO password(password, user_id) VALUES("${hash}",9);
//       `;

//     connection.query(query, (err) => {
//       if (err) throw err;
//       console.log("success");
//     });
//   });
// };

module.exports = token;
