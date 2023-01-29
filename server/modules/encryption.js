const bcrypt = require("bcrypt");

const encrypt = {
  saveEncryptPassword: async (password, cb) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw new Error("Coundn't encrypt the user password: ", err);

      cb(hash);
    });
  },

  comparePassword: async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (isMatch) {
      return "Password is correct";
    } else {
      return "Password is incorrect";
    }
  },
};

module.exports = encrypt;
