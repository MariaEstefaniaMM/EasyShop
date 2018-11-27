SELECT * FROM cart 
INNER JOIN products on products.id_product = cart.id_product 
INNER JOIN users on products.id_user = users.id_user 
WHERE cart.id_user = $1