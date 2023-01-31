const express = require("express");
const router = express.Router();

router.get("/user", function (req, res, next) {
    console.log("babaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    bringMyProducts(req.token, (response) => {
      console.log("response:: ", response);
      if (response?.data) {
        res.status(200).json(response);
      } else {
        console.log("failed to login");
        res.status(401).send(response);
      }
    });
  });