const express = require("express");
const router = express.Router();
const {
  bringMyProducts,
  addProduct,
  deleteProduct,
  updateAmount,
  getCategories,
  showProduct,
  bringAllProducts,
} = require("../db/productsQuery");

router.get("/", function (req, res, next) {
  console.log("babaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  bringAllProducts((response) => {
    console.log("response:: ", response);
    if (response?.data) {
      res.status(200).json(response);
    } else {
      console.log("failed to login");
      res.status(401).send(response);
    }
  });
});

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


router.get("/:id/data", async function (req, res, next) {
  const { id } = req.params;
  const category = await showProduct(id);
  console.log("request for categories ", category);
  res.json(category);
});

//get all category.
router.get("/category/:categoryId", async function (req, res, next) {
  const { categoryId } = req.params;
  const category = await getCategories(categoryId);
  console.log("request for categories ", category);
  res.json(category);
});

router.post("/addProduct", function (req, res) {
  const { token, product_name, product_picture, price, amount, category_id,description } =
    req.body;
  console.log("body", req.body);
  addProduct(
    token,
    product_name,
    product_picture,
    price,
    amount,
    category_id,
    description,
    (response) => {
      console.log("response:: ", response);
      if (response.data==="user") {
        console.log(response);
        res.status(200).json(response);
      }
      else if(response.data==="admin"){
        console.log(response);
        res.status(200).json(response);
      } 
      else {
        console.log("failed to login");
        res.status(401).send(response);
      }
    }
  );
});
router.delete("/deleteProduct", function (req, res) {
  const { product_id } = req.body;
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
router.put("/updateAmount", function (req, res) {
  const { product_id, amount } = req.body;
  console.log("body", req.body);
  updateAmount(product_id, amount, (response) => {
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
