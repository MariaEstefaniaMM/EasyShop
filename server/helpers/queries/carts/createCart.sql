--DECLARE current_stock integer;
--BEGIN
  --  SELECT quantity ON current_stock FROM products WHERE is_product=$1;
    --IF($2>current_stock) THEN
      --  RAISE EXCEPTION 'Insuficient Stock';
    --ELSE
        INSERT INTO cart
        (date_created, id_product, product_quantity, id_user)
        VALUES (CURRENT_TIMESTAMP,$1,$2,$3) RETURNING id_cart;
    --END