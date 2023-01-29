const express = require("express");
const router = express.Router();
const checkUser = require("../db/loginQuery");
const { validateUser } = require("../db/loginQuery");

router.post("/", function (req, res, next) {
  const { username, password } = req.body;
  // checkUser(username, password, (result) => {
  //check if the username and the password are correct.

  validateUser(username, password, (response) => {
    console.log("response:: ", response);
  });

  // if (result) {
  //   console.log(typeof result, 'login request"');
  //   res.status(200).json(result);
  // } else {
  //   console.log("bobby");
  //   res.status(400).send(result);
  // }
  // });
});

module.exports = router;
