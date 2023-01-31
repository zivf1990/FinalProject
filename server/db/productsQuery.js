const connection = require("../modules/sqlConfig");
const connection2 = require("../modules/sqlPromiseConfig");

const productsQueries = {
  bringAllProducts: (cb) => {
    const selectQuery = `
         SELECT *
         FROM product p
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
  bringMyProducts: (token, cb) => {
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
      }
      if (results.length > 0) {
        cb({ message: "found your products", data: results });
      } else {
        cb({ message: "you have no products" });
      }
    });
  },
  addProduct: (
    token,
    product_name,
    product_picture,
    price,
    amount,
    category_id,
    cb
  ) => {
    const selectQuery = `
               SELECT user_id, permission_level
               FROM user_permission 
               WHERE token = '${token}';
             `;
    connection.query(selectQuery, function (error, results) {
      console.log(results);
      if (error) {
        cb({ message: "failed to bring your products" });
        console.log("bad job man", "erer");
      }
      if (results.length > 0) {
        let seller_id;
        if (results[0].permission_level == "user") {
          seller_id = results[0].user_id;
        } else if (results[0].permission_level == "admin") {
          seller_id = null;
        }
        connection.query(
          `INSERT INTO product(product_name, product_picture, price, amount, category_id,seller_id)
                     VALUES("${product_name}","${product_picture}",${price},${amount},${category_id},${seller_id});`,
          function (err) {
            if (err) {
              cb({ message: "failed to bring your products 80" });
            } else {
              cb({
                message: "product added",
                data: results[0].permission_level,
              });
              console.log("good job man", "erer");
            }
          }
        );
      } else {
        cb({ message: "token undefined" });
      }
    });
  },
  deleteProduct: (product_id, cb) => {
    const selectQuery = `
               DELETE FROM product
               WHERE product_id = ${product_id}
             `;
    connection.query(selectQuery, function (error, results) {
      if (error) {
        cb({ message: "failed to bring your products" });
        console.log("bad job man", "erer");
      } else {
        cb({ message: "product deleted", data: true });
      }
    });
  },
  updateAmount: (product_id, amount, cb) => {
    const selectQuery = `
               UPDATE product
               SET amount =${amount}
               WHERE product_id = ${product_id};
             `;
    connection.query(selectQuery, function (error, results) {
      if (error) {
        cb({ message: "failed to bring your products" });
        console.log("bad job man", "erer");
      } else {
        cb({ message: "product deleted", data: true });
      }
    });
  },
  getCategories: async (categoryId) => {
    const data = await (
      await connection2
    ).execute(`
    SELECT * FROM product p
    WHERE category_id = ${categoryId};`);
    const categories = data[0];
    return categories;
  },
  showProduct: async (product_id) => {
    const data = await (
      await connection2
    ).execute(`
    SELECT * FROM product p
    WHERE product_id = ${product_id};`);
    const categories = data[0];
    console.log(categories);
    return categories[0];
  },
};
module.exports = productsQueries;
