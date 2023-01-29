const express = require("express");
const router = express.Router();
const connection = require("../modules/sqlConfig");
const bcrypt = require("bcrypt");
const checkUser = require("../db/loginQuery");

router.post("/", function (req, res, next) {
  
  const { username, password } = req.body;
  checkUser(username,password, (result) => {
    if(result){
      console.log(typeof result,'login request"');
      res.status(200).json(result);
    }
    else{
      console.log("bobby");
      res.status(400).send(result);
    }
  })
});

module.exports = router;
