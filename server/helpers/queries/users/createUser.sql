INSERT INTO users 
(user_name, user_lastname, user_email, user_password, user_photo, user_address, user_phone, username)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id_user