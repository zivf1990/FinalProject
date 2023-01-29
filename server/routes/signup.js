const express = require("express");
const router = express.Router();
const createUser2 = require("../db/signupQuery");

router.post("/", function (req, res, next) {
  console.log("recived signup request");

  const { username, password, email, name, address } = req.body;

  try {
    createUser2(username, password, email, name, address, (data, error) => {
      console.log("signup router ", data);

      if (data) {
        res.status(201).json(data);
      } else {
        res.status(304).send("something went wrong");
      }
    });
  } catch (e) {
    console.log("zivvvvvvvv");
  }
});

module.exports = router;
