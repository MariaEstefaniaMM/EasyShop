INSERT INTO products 
(name_product,des_product,price_product,quantity, img_product,id_category, id_user) 
VALUES($1,$2,$3,$4,$5,$6,$7)  RETURNING id_product