SELECT * FROM cart 
INNER JOIN products on products.id_product = cart.id_product 
INNER JOIN users on products.id_user = users.id_user 
INNER JOIN category on products.id_category = category.id_category
WHERE cart.id_user = $1