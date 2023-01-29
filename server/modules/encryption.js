const bcrypt = require("bcrypt");

const savePassword = async (user_id, password) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw new Error("Coundn't encrypt the user password: ", err);

    const query = `
      INSERT INTO password(password, user_id) VALUES("${hash}",9);
      `;

    connection.query(query, (err) => {
      if (err) throw err;
      console.log("success");
    });
  });
};
