const express = require("express");
const router = express.Router();
const connection = require("../modules/sqlConfig");
const bcrypt = require("bcrypt");




router.post("/", function (req, res, next) {
  console.log("recived signup request");

  const { username, password, email, name, address } = req.body;

  

});

module.exports = router;
