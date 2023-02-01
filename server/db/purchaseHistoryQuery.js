const connection = require("../modules/sqlConfig");
const connection2 = require("../modules/sqlPromiseConfig");

const purchaseHistoryQuery = {
  bringMyHistory: (user_id, cb) => {
    const selectQuery = `
        SELECT
        product.product_name,
        purchase_history.purchase_amount,
        purchase_history.purchase_date
        FROM
        product
        JOIN purchase_history
        ON product.product_id = purchase_history.product_id
        WHERE user_id =${user_id}
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
  brisngMyHistory: (user_id, cb) => {
    console.log(user_id, "hjello");
    const selectQuery = `
           SELECT p.product_id, p.product_name, p.product_picture, p.price, p.amount, p.category_id
           FROM product p
           WHERE user_id = ${user_id}
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
  },
};
module.exports = purchaseHistoryQuery;
