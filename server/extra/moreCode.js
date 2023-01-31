const createProductTable = `CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    seller_id INT NOT NULL,
    amount INT NOT NULL,
    product_picture VARCHAR(255) NOT NULL
  );`;

const triggerTableProduct1 = `
  CREATE TRIGGER update_product_amount
    AFTER INSERT ON purchase_history
    FOR EACH ROW
    BEGIN
      UPDATE product
      SET amount = amount - NEW.purchase_amount
      WHERE product_id = NEW.product_id;
    END;`;

let values = [["sport"], ["electronics"], ["cars"]];

let query = `INSERT INTO category (category_name) VALUES ?`;

// connection.query(query, [values], (err, result) => {
//   if (err) console.log(err);
//   console.log(result);
// });

const defaultValueQuery = `ALTER TABLE user_info
    MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`;
