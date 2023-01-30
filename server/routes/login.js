const express = require("express");
const router = express.Router();
const checkUser = require("../db/loginQuery");
const { validateUser } = require("../db/loginQuery");

//login request.
router.post("/", function (req, res, next) {
  const { username, password } = req.body;

  //check if the username and the password are correct.
  validateUser(username, password, (response) => {
    console.log("response:: ", response);
    if (response?.token) {
      res.status(200).json(response);
    } else {
      console.log("failed to login");
      res.status(401).send(response);
    }
  });
});

module.exports = router;
