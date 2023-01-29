const bcrypt = require("bcrypt");
const connection = require("../modules/sqlConfig");

const token = {
  generateToken: async (user_id, cb) => {
    bcrypt.hash(
      Math.random() * Number.MAX_SAFE_INTEGER,
      10,
      async (err, token) => {
        if (err) throw new Error("Couldn't encrypt the user password: ", err);

        const query = `SELECT token FROM user_permission WHERE token = ?`;
        const results = await connection.query(query, [token]);

        if (results.length > 0) {
          return generateToken(user_id, cb);
        }

        const insertQuery = `INSERT INTO user_permission (user_id, token) VALUES (?, ?)`;
        await connection.query(insertQuery, [user_id, token]);

        cb(token);
      }
    );
  },
  removeToken: (token, cb) => {
    connection.query(
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
