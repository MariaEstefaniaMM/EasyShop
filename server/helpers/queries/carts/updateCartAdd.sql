UPDATE cart SET product_quantity=product_quantity+$1 
WHERE id_cart = $2;
UPDATE products SET quantity=quantity-$1
WHERE id_product = $3;
