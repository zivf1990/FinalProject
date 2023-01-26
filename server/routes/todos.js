const express = require("express");
const router = express.Router();
const connection = require("../modules/sqlConfig");

/* GET all todos listing. */
router.get("/", function (req, res, next) {
  console.log("todo list request");
  connection.query(`SELECT * FROM todo`, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
});

router.get("/:id", function (req, res, next) {
  console.log("todo id request");
  connection.query(
    `SELECT * FROM todo WHERE id = ${req.params.id}`,
    (err, data) => {
      if (err) throw err;
      if (data.length > 0) res.send(data[0]);
      else res.send("User not found");
    }
  );
});

router.get("/:searched", function (req, res, next) {
  console.log("searched todos request");

  const { searched } = req.params;

  connection.query(
    `
        SELECT * 
        FROM todo 
        WHERE title LIKE '%${searched}%';
        
    `,
    (err, data) => {
      if (err) throw err;
      console.log(typeof data);
      if (data.length > 0) res.send(data[0]);
      else res.send("User not found");
    }
  );
});

router.post("/", function (req, res, next) {
  const { user_id, title } = req.body;
  console.log(user_id,title);
  connection.query(
    `
        INSERT INTO todo(title, completed, user_id) 
        VALUES("${title}",false, ${user_id});
    `,
    (err) => {
      if (err) {
        console.log("very bad");
        return res.send(false);
      }
      connection.query(  `
      SELECT * 
      FROM todo WHERE user_id = ${user_id}
 `, (error, result) => {
   if(error){
    console.log("bad");
     throw error;
   }
   console.log("hello", result);

   res.send(result);
 })
    }
  );
});

router.put("/", function (req, res, next) {
  console.log("PUT request for todo ", req.body);
  const { todo_id, completed, checkCompleted, title,user_id } = req.body;
  console.log(completed);
  if (title) {
    update("title", title);
  }

  if (checkCompleted) {
    update("completed", completed);
  }

  function update(column, item) {
    connection.query(
      `
          UPDATE todo
          SET ${column} = ${item}
          WHERE id = ${todo_id};
        `,
      (err) => {
        if (err) {
          return res.send(false);
        }
        connection.query(  `
        SELECT * 
        FROM todo WHERE user_id = ${user_id}
   `, (error, result) => {
     if(error){
       throw error;
     }
     console.log("hello", result);
 
     res.send(result);
   })
      }
    );
  }
});

router.delete("/", function (req, res, next) {
  const { todo_id,user_id } = req.body;
  console.log("delete req", todo_id);
  connection.query(
    `
          DELETE 
          FROM todo
          WHERE id = ${todo_id}
    `,
    (err) => {
      if (err) {
        return res.send(false);
      }
     connection.query(  `
     SELECT * 
     FROM todo WHERE user_id = ${user_id}
`, (error, result) => {
  if(error){
    throw error;
  }
  res.send(result);
})
    }
  );
});

module.exports = router;
