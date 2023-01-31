const connection = require("../modules/sqlConfig");
const connection2 = require("../modules/sqlPromiseConfig");

const productsQueries = {
    bringAllHistory:(cb) => {
  const selectQuery = `
         SELECT *
         FROM product p
         JOIN 
       `;
  connection.query(selectQuery, function (error, results) {
    console.log(results);
    if (error) {
      cb({ message: "failed to bring your products" });
      console.log("sds");
    }
    if (results.length > 0) {
      cb({ message: "found your products", data: results });
      console.log("sddddddds");
    } else {
      cb({ message: "you have no products" });
      console.log("ss");
    }
  });
},
  bringMyHistory: (token, cb) => {
    console.log(token, "hjello");
    const selectQuery = `
           SELECT p.product_id, p.product_name, p.product_picture, p.price, p.amount, p.category_id
           FROM product p
           JOIN user_permission per
           ON per.user_id = p.seller_id
           WHERE token = '${token}'
           GROUP BY product_id;
         `;
    connection.query(selectQuery, function (error, results) {
      console.log(results);
      if (error) {
        cb({ message: "failed to bring your products" });
        console.log("sds");
      }
      if (results.length > 0) {
        cb({ message: "found your products", data: results });
        console.log("sddddddds");
      } else {
        cb({ message: "you have no products" });
        console.log("ss");
      }
    });
  }
}