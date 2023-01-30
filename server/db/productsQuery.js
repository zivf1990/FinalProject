const connection = require("../modules/sqlConfig");
const productsQueries = {
    bringMyProducts: (token, cb) => {
        const selectQuery = `
           SELECT p.product_id, p.product_name, p.product_picture, p.price, p.amount, p.category_id
           FROM products p
           JOIN user_permission per
           ON per.user_id = p.seller_id;
           WHERE token = '${token}'
           GROUP BY product_id;
         `;
        connection.query(selectQuery, function (error, results) {
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
    addProduct: (token,product_name, product_picture, price, amount, category_id, cb) => {
        const selectQuery = `
               SELECT user_id
               FROM user_permission 
               WHERE token = '${token}'
             `;
        connection.query(selectQuery, function (error, results) {
            if (error) {
                cb({ message: "failed to bring your products" });
            }
            if (results.length > 0) {
                connection.query(
                    `INSERT INTO products(product_name, product_picture, price, amount, category_id,seller_id) VALUES("${product_name}","${product_picture}",${price},${amount},${category_id})`,
                    function (err, toke) {
                        if(err){
                            cb({ message: "failed to bring your products 80" })
                        }
                        else{
                        cb({ message: "product added" });
                        console.log(token, "erer");}
                    }
                );
            }
            else {
                cb({ message: "token undefined" });
            }
        });
    }

}
module.exports = productsQueries