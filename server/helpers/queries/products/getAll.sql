SELECT * FROM products 
INNER JOIN category ON category.id_category = products.id_category
INNER JOIN (payment_mode_products INNER JOIN payment_mode ON payment_mode.id_payment_mode = payment_mode_products.id_payment_mode)
            ON payment_mode_products.id_product = products.id_product

