-- User-wise, Product-wise Ordering Quantity with Total Item Value
SELECT 
    u.username,
    p.name AS product_name,
    SUM(oi.quantity) AS total_quantity,
    SUM(oi.price) AS total_value
FROM 
    Users u
JOIN 
    Orders o ON u.id = o.user_id
JOIN 
    OrderItems oi ON o.id = oi.order_id
JOIN 
    Products p ON oi.product_id = p.id
GROUP BY 
    u.username, p.name
ORDER BY 
    u.username, p.name;


-- Weekly Orders Analysis for the First Quarter of 2024

SELECT 
    YEARWEEK(o.created_at, 1) AS week,
    COUNT(*) AS total_orders,
    SUM(o.total) AS total_revenue
FROM 
    Orders o
WHERE 
    o.created_at >= '2024-01-01' AND o.created_at < '2024-04-01'
GROUP BY 
    week
ORDER BY 
    week;


-- Retrieve Product Name and Number of Orders Excluding Products with Fewer than 5 Orders

SELECT 
    p.name AS product_name,
    COUNT(DISTINCT oi.order_id) AS number_of_orders
FROM 
    OrderItems oi
JOIN 
    Products p ON oi.product_id = p.id
GROUP BY 
    p.name
HAVING 
    COUNT(DISTINCT oi.order_id) >= 5
ORDER BY 
    number_of_orders DESC;


