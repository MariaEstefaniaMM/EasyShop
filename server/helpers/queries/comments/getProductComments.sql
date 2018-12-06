SELECT id_comment, id_product, comments.id_user, comment_text, comment_created_at, comment_updated_at, id_first_comment, username FROM comments
INNER JOIN users ON comments.id_user=users.id_user
WHERE id_product = $1