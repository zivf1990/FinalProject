const express = require("express");
const { bringMyHistory, bringAllHistory } = require("../db/purchaseHistoryQuery");
const router = express.Router();
const connection = require("../modules/sqlPromiseConfig");

const addPurchase = async (user_id, product_id, purchase_amount) => {
  const data = await (
    await connection
  ).execute(
    `
    INSERT INTO purchase_history(user_id, product_id, purchase_amount, purchase_date)
    VALUES(${user_id}, ${product_id}, ${purchase_amount}, CURRENT_TIMESTAMP);`
  );
  console.log("Result new product purchase:", data);
};

router.get("/user", function (req, res, next) {
  const { user_id, permission_level } = req.user;

  bringMyHistory(user_id, (response) => {
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
  const { user_id } = req.user;
  const { userinfo, purchaseList } = req.body;

  purchaseList.forEach((item) => {
    const { product_id, quantity } = item;
    console.log("product_id ", product_id);
    console.log("quantity ", quantity);
    addPurchase(user_id, product_id, quantity);
  });
});

module.exports = router;
