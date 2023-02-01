const express = require("express");
const router = express.Router();
const createUser = require("../db/signupQuery");


router.post('/', (req, res) => {
  const { username, password, email, name, address } = req.body;

  createUser(username, password, email, name, address, (result) => {
    if (result.status === 201) {
      res.status(201).json({
        message: result.message,
        sessionID: result.sessionID,
        permission_level: result.permission_level,
      });
    } else if (result.status === 400) {
      res.status(400).json({
        message: result.message,
      });
    } else {
      res.status(500).json({
        message: result.message,
      });
    }
  });
});

module.exports = router;



