const express = require("express");
const router = express.Router();
const { bringMyProducts, addProduct, deleteProduct, updateAmount } = require("../db/productsQuery");

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

router.post('/addProduct', function (req, res) {
  const {token,product_name, product_picture, price, amount, category_id}=req.body;
  console.log("body", req.body);
  addProduct(token,product_name, product_picture, price, amount, category_id, (response) => {
    console.log("response:: ", response);
    if (response.data) {
      console.log(response);
      res.status(200).json(response);
    } else {
      console.log("failed to login");
      res.status(401).send(response);
    }
  });
});
router.delete('/deleteProduct', function (req, res) {
  const {product_id}=req.body;
  console.log("body", req.body);
  deleteProduct(product_id, (response) => {
    if (response.data) {
      console.log(response);
      res.status(200).json(response);
    } else {
      console.log("failed to login");
      res.status(401).send(response);
    }
  });
});
router.put('/updateAmount', function (req, res) {
  const {product_id,amount}=req.body;
  console.log("body", req.body);
  updateAmount(product_id,amount, (response) => {
    if (response.data) {
      console.log(response);
      res.status(200).json(response);
    } else {
      console.log("failed to login");
      res.status(401).send(response);
    }
  });
});

module.exports = router;
