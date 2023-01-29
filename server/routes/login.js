const express = require("express");
const router = express.Router();
const connection = require("../modules/sqlConfig");
const bcrypt = require("bcrypt");
const checkUser = require("../db/loginQuery");

router.post("/", function (req, res, next) {
  const { username, password } = req.body;
  checkUser(username, password, (result) => {
    //check if the username and the password are correct.

    const query = `  
    SELECT 
    CASE 
      WHEN ui.username = '${username}' 
      THEN 
        (
          SELECT 
            CASE 
              WHEN up.password = '${password}' 
              THEN 'true' 
              ELSE 'false' 
            END 
          FROM user_password up 
          WHERE up.user_id = ui.user_id
        ) 
      ELSE 'false' 
    END AS result
  FROM user_info ui 
  WHERE ui.username = 'input_username';`;

    const isAuth = connection.promise.query(query);
    console.log("isAuth", isAuth);

    if (result) {
      console.log(typeof result, 'login request"');
      res.status(200).json(result);
    } else {
      console.log("bobby");
      res.status(400).send(result);
    }
  });
});

module.exports = router;
