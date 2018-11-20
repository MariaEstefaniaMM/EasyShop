SELECT * FROM commets
INNER JOIN users ON commets.id_user=users.id_user
WHERE   id_product = $1