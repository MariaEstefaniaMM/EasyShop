INSERT INTO comments 
(id_product, id_user, comment_text, comment_created_at)
VALUES ($1,$2,$3,CURRENT_TIMESTAMP) RETURNING id_comment