UPDATE users SET
user_name=$1, user_lastname=$2, user_email=$3, user_photo=$4, user_address=$5, user_phone=$6, username=$8
WHERE id_user = $7