var express = require("express");
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
  
});
module.exports = router;
