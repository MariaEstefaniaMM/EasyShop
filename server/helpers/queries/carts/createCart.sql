UPDATE products SET quantity=quantity-$2
WHERE id_product = $1;
INSERT INTO cart
(date_created, id_product, product_quantity, id_user)
VALUES (CURRENT_TIMESTAMP,$1,$2,$3) RETURNING id_cart;
