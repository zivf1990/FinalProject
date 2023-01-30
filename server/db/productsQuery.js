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
                console.log("bad job man", "erer");
            }
            if (results.length > 0) {
                console.log(product_name, product_picture, price, amount, category_id);
                connection.query(
                    `INSERT INTO product(product_name, product_picture, price, amount, category_id,seller_id)
                     VALUES("${product_name}","${product_picture}",${price},${amount},${category_id},${results[0].user_id});`,
                    function (err, toke) {
                        if(err){
                            cb({ message: "failed to bring your products 80" })
                        }
                        else{
                        cb({ message: "product added" , data:  true});
                        console.log("good job man", "erer");}
                    }
                );
            }
            else {
                cb({ message: "token undefined"});
            }
        });
    }

}
module.exports = productsQueries