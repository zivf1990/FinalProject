const express = require("express");
const router = express.Router();
const connection = require("../modules/sqlPromiseConfig");

const getCategories = async () => {
  const data = await (await connection).execute(`SELECT * FROM category;`);
  const categories = data[0];
  return categories;
};

//get all categories.
router.get("/", async function (req, res, next) {
  try {
    const categories = await getCategories();
    console.log("request for categories ", categories);
    res.status(200).json(categories);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e.message });
  }
});

module.exports = router;
