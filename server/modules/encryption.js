const bcrypt = require("bcrypt");

const encrypt = {
  saveEncryptPassword: async (password, cb) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw new Error("Coundn't encrypt the user password: ", err);

      cb(hash);
    });
  },
};

module.exports = encrypt;
