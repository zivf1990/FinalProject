const express = require("express");
const { bringMyHistory, bringAllHistory } = require("../db/purchaseHistoryQuery");
const router = express.Router();

router.get("/user", function (req, res, next) {
  console.log("eeredddddddr", req.token);
  bringMyHistory(req.token, (response) => {
    console.log("response:: ", response);
    if (response?.data) {
      res.status(200).json(response);
    } else {
      console.log("failed to login");
      res.status(401).send(response);
    }
  });
});

router.get("/", function (req, res, next) {
  bringAllHistory( (response) => {
    console.log("response:: ", response);
    if (response?.data) {
      res.status(200).json(response);
    } else {
      console.log("failed to login");
      res.status(401).send(response);
    }
  });
});









router.post(`/`, (req, res, next) => {
  console.log("recived post requst for purchase history.");
  console.log(req.body);
  console.log(" post req.token", req.token);
});

module.exports = router;
