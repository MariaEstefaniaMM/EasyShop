SELECT * FROM comments
INNER JOIN users ON comments.id_user=users.id_user
WHERE   id_product = $1