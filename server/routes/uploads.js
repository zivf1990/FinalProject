var express = require("express");
var router = express.Router();
const path = require("path");

router.get("/:file", (req, res) => {
  const { file } = req.params;
  res.sendFile(path.join(process.cwd(), "uploads", file));
});

module.exports = router;
