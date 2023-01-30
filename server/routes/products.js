var express = require("express");
const { bringMyProducts, addProduct } = require("../db/productsQuery");
var router = express.Router();

router.get("/:token", function (req, res, next) {
  bringMyProducts(req.params.token, (response) => {
    console.log("response:: ", response);
    if (response?.data) {
      res.status(200).json(response);
    } else {
      console.log("failed to login");
      res.status(401).send(response);
    }
  });
});
router.post('/addProduct', function (req, res) {
  const {token,product_name, product_picture, price, amount, category_id}=req.body;
  console.log("body", req.body);
  addProduct(token,product_name, product_picture, price, amount, category_id, (response) => {
    console.log("response:: ", response);
    if (response.data) {
      console.log(response.data);
      res.status(200).json(response);
    } else {
      console.log("failed to login");
      res.status(401).send(response);
    }
  });
});
module.exports = router;
