-- Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone_no VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Order Items table
CREATE TABLE OrderItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

-- Cart table
CREATE TABLE Cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

-- -- Insert users
-- INSERT INTO Users (username, password, created_at) VALUES 
-- ('Demo1', 'password1', CURRENT_TIMESTAMP), 
-- ('Demo2', 'password2', CURRENT_TIMESTAMP);

-- -- Insert products
-- INSERT INTO Products (name, description, price, stock, created_at) VALUES 
-- ('samsung', 'Description1', 10.00, 100, CURRENT_TIMESTAMP), 
-- ('iphone', 'Description2', 20.00, 200, CURRENT_TIMESTAMP);

-- -- Insert orders
-- INSERT INTO Orders (user_id, total, created_at) VALUES 
-- (1, 30.00, CURRENT_TIMESTAMP), 
-- (2, 40.00, CURRENT_TIMESTAMP);

-- -- Insert order items
-- INSERT INTO OrderItems (order_id, product_id, quantity, price, created_at) VALUES 
-- (1, 1, 2, 20.00, CURRENT_TIMESTAMP), 
-- (1, 2, 1, 10.00, CURRENT_TIMESTAMP),
-- (2, 1, 1, 10.00, CURRENT_TIMESTAMP), 
-- (2, 2, 1, 30.00, CURRENT_TIMESTAMP);

-- -- Insert cart items
-- INSERT INTO Cart (user_id, product_id, quantity, created_at) VALUES 
-- (1, 1, 1, CURRENT_TIMESTAMP), 
-- (1, 2, 2, CURRENT_TIMESTAMP), 
-- (2, 1, 1, CURRENT_TIMESTAMP);
