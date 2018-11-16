INSERT INTO cart
(amount, date_created)
VALUES (0.00, CURRENT_TIMESTAMP) RETURNING id_cart