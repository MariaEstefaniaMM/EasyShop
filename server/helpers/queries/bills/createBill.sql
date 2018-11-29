INSERT INTO bill
(amount, payment_mode) 
VALUES ($1,$2) RETURNING id_bill;