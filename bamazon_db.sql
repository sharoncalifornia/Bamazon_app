DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price float4 default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Neck Travel Pillow", "Travel", 24.95, 600);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Storage Bags","Travel", 18.98, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Boom Box", "Entertainment", 67.95, 275);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beat Headsets", "Entertainment", 215.25, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The North Face Women's Ski Gear", "Clothing", 67.95, 275);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Wantdo Men's Ski Gear", "Clothing", 78.89, 250);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Arctix Women's Snow Pants", "Clothing", 65.95, 275);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("4ucycling Windproof Men's Athletic Pants", "Clothing", 75.89, 250);

SELECT * from products;

DROP table products;


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kindle Fire", "Electronics", 119.99, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GoPro Hero5", "Electronics", 198.63, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rylo 360 Video Camera", "Electronics", 497.87, 275);

