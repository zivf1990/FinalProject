const express = require("express");
const router = express.Router();
const connection = require("../modules/sqlConfig");

/* GET all comments listing. */
router.get("/", function (req, res, next) {
  console.log("comment list request");
  connection.query(`SELECT * FROM comment`, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
});

router.get("/:postId", function (req, res, next) {
  console.log("comment id request");
  connection.query(
    `
    SELECT * 
    FROM comment c 
    JOIN post p
    ON p.id = c.post_id
    WHERE p.id = ${req.params.postId}
    `,
    (err, data) => {
      if (err) throw err;
      console.log(typeof data);
      if (data.length > 0) res.send(data[0]);
      else res.send("comment not found");
    }
  );
});

router.get("/:searched", function (req, res, next) {
  console.log("searched comments request");

  const { searched } = req.params;

  connection.query(
    `
        SELECT * 
        FROM comment 
        WHERE title LIKE '%${searched}% OR body LIKE '%${searched}%';
        
    `,
    (err, data) => {
      if (err) throw err;

      if (data.length > 0) res.send(data[0]);
      else res.send([]);
    }
  );
});

//Insert new comment.
router.post("/", function (req, res, next) {
  const { post_id, body, title } = req.body;

  connection.query(
    `
        INESRT INTO comment(title, body, post_id) 
        VALUES("${title}", ${body}, ${post_id});
    `,
    (err) => {
      if (err) {
        return res.send(false);
      }
      res.send(true);
    }
  );
});

// Update the comment.
router.put("/", function (req, res, next) {
  const { comment_id, body, title } = req.body;

  if (title) {
    update("title", title);
  }

  if (body) {
    update("body", body);
  }

  function update(column, item) {
    connection.query(
      `
          UPDATE comment
          SET ${column} = "${item}"
          WHERE id = ${comment_id}
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

//Delete comment.
router.delete("/", function (req, res, next) {
  const { comment_id } = req.body;

  connection.query(
    `
          DELETE 
          FROM comment
          WHERE id = ${comment_id}
    `,
    (err) => {
      if (err) {
        return res.send(false);
      }
      res.send(true);
    }
  );
});

module.exports = router;
