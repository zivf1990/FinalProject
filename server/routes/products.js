const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "upload/" });
const {
  getSellerProducts,
  addProduct,
  removeProduct,
  updateAmount,
  getCategories,
  showProduct,
  bringAllProducts,
} = require("../db/productsQuery");

router.get("/", function (req, res, next) {
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
  const { user_id, permission_level } = req.user;

  getSellerProducts(user_id, (response) => {
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

router.post("/addProduct", upload.single("product_picture"), function (req, res) {
  const { user_id, permission_level } = req.user;
  const image = req.file;
  console.log("product_picture ", image.path);
  console.log("addProduct ", user_id, permission_level);
  const { product_name, price, amount, category_id, description } = req.body;

  addProduct(
    user_id,
    permission_level,
    product_name,
    image.path,
    price,
    amount,
    category_id,
    description,
    (response) => {
      console.log("response:: ", response);
      if (response.data === "user") {
        console.log(response);
        res.status(200).json(response);
      } else if (response.data === "admin") {
        console.log(response);
        res.status(200).json(response);
      } else {
        console.log("failed to login");
        res.status(401).send(response);
      }
    }
  );
});
router.delete("/deleteProduct", function (req, res) {
  const { product_id } = req.body;
  console.log("body", req.body);
  removeProduct(product_id, (response) => {
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
