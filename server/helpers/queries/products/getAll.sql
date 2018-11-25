SELECT * FROM products 
INNER JOIN category ON category.id_category = products.id_category
INNER JOIN users ON users.id_user = products.id_user
