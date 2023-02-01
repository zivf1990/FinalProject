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
  getSellerProducts: (user_id, cb) => {
    console.log(user_id, "hjello");
    const selectQuery = `
           SELECT p.product_id, p.product_name, p.product_picture, p.price, p.amount, p.category_id,p.description
           FROM product p
           JOIN user_permission per
           WHERE seller_id = '${user_id}'
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
  getSellerProducts: (user_id, cb) => {
    const selectQuery = `
    SELECT p.product_id, p.product_name, p.product_picture, p.price, p.amount, p.category_id,p.description
    FROM product p
    JOIN user_permission per
    WHERE seller_id = '${user_id}'
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
    user_id,
    permission_level,
    product_name,
    product_picture,
    price,
    amount,
    category_id,
    description,
    cb
  ) => {
    const selectQuery = `
               SELECT username
               FROM user_info
               WHERE user_id = ${user_id};
             `;
    connection.query(selectQuery, function (error, results) {
      if (error) {
        cb({ message: "failed to bring your products" });
      }
      console.log("RESULTS ", results);
      if (results.length > 0) {
        let seller_name;
        if (permission_level == "user") {
          seller_name = results[0].username;
        } else if (permission_level == "admin") {
          user_id = null;
          seller_name = "shopify";
        }
        connection.query(
          `INSERT INTO product(product_name, product_picture, price, amount, category_id,seller_id, seller_name, description)
                     VALUES("${product_name}","${product_picture}",${price},${amount},${category_id},${user_id},"${seller_name}","${description}");`,
          function (err) {
            if (err) {
              console.log(err);
              cb({ message: "failed to bring your products 80" });
            } else {
              cb({
                message: "product added",
                data: permission_level,
              });
              console.log("good job man", "erer");
            }
          }
        );
      } else {
        cb({ message: "user_id undefined" });
      }
    });
  },
  removeProduct: (product_id, cb) => {
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
