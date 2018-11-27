UPDATE products SET quantity=quantity+$2
WHERE id_product = $3;
DELETE FROM cart WHERE id_cart= $1;

    