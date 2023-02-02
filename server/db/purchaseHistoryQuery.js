const connection = require("../modules/sqlConfig");
const connection2 = require("../modules/sqlPromiseConfig");
const moment = require("moment");

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
        WHERE user_id =1
       `;
    connection.query(selectQuery, function (error, results) {
      console.log(results[0].purchase_date,"Wewwew");
      results[0].purchase_date=moment.utc(results[0].purchase_date).local().format('DD/MM/YYYY');
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
  bringAllHistory: (cb) => {
    const selectQuery = `
    SELECT
    user_info.username,
    product.product_name,
    product.seller_name,
    purchase_history.purchase_amount,
    purchase_history.purchase_date
    FROM
    product
    JOIN purchase_history
    ON product.product_id = purchase_history.product_id
    JOIN user_info 
    ON purchase_history.user_id = user_info.user_id
      
       `;
    connection.query(selectQuery, function (error, results) {
      results[0].purchase_date=moment.utc(results[0].purchase_date).local().format('DD/MM/YYYY');      if (error) {
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
