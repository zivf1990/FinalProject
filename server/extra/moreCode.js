const createProductTable = `CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    seller_id INT NOT NULL,
    amount INT NOT NULL,
    product_picture VARCHAR(255) NOT NULL
  );`;

const triggerTableProduct = `
  CREATE TRIGGER update_product_amount
    AFTER INSERT ON purchase_history
    FOR EACH ROW
    BEGIN
      UPDATE product
      SET amount = amount - NEW.purchase_amount
      WHERE id = NEW.product_id;
    END;`;
