const Sequelize = require("sequelize");
const sequelize = new Sequelize("shopify", "root", "z10mz10m", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
