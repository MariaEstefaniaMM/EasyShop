SELECT * FROM products 
INNER JOIN category ON category.id_category = products.id_category
WHERE id_user = $1