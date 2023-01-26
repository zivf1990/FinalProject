const express = require("express");
const router = express.Router();
const connection = require("../modules/sqlConfig");

/* GET all posts listing. */
router.get("/", function (req, res, next) {
  console.log("post list request");
  connection.query(`SELECT * FROM post`, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
});

router.get("/:id", function (req, res, next) {
  console.log("post id request");
  connection.query(
    `SELECT * FROM post WHERE id = ${req.params.id}`,
    (err, data) => {
      if (err) throw err;
      console.log(typeof data);
      if (data.length > 0) res.send(data[0]);
      else res.send("User not found");
    }
  );
});

router.get("/:searched", function (req, res, next) {
  console.log("searched posts request");

  const { searched } = req.params;

  connection.query(
    `
        SELECT * 
        FROM post 
        WHERE title LIKE '%${searched}% OR body LIKE '%${searched}%';
        
    `,
    (err, data) => {
      if (err) throw err;

      if (data.length > 0) res.send(data[0]);
      else res.send([]);
    }
  );
});

//Insert new post.
router.post("/", function (req, res, next) {
  const { user_id, body, title } = req.body;

  console.log("Posts request recived in the server");

  connection.query(
    `
        INSERT INTO post(title, body, user_id) 
        VALUES("${title}", "${body}", ${user_id});
    `,
    (err) => {
      if (err) {
        console.log("very bad");
        return res.send(false);
      }
      connection.query(
        `
      SELECT * 
      FROM post WHERE user_id = ${user_id}
 `,
        (error, result) => {
          if (error) {
            console.log("bad");
            throw error;
          }
          console.log("hello", result);

          res.send(result);
        }
      );
    }
  );
});

// Update the post.
router.put("/", function (req, res, next) {
  const { post_id, body, title } = req.body;

  if (title) {
    update("title", title);
  }

  if (body) {
    update("body", body);
  }

  function update(column, item) {
    connection.query(
      `
          UPDATE post
          SET ${column} = "${item}"
          WHERE id = ${post_id}
        `,
      (err) => {
        if (err) {
          return res.send(false);
        }
        res.send(true);
      }
    );
  }
});

router.delete("/:post_id", function (req, res, next) {
  connection.query(
    `
          DELETE 
          FROM post
          WHERE id = ${req.params.post_id}
    `,
    (err) => {
      if (err) {
        return res.send(false);
      }
      console.log("item deleted");
      res.send(true);
    }
  );
});

module.exports = router;
