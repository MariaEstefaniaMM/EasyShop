INSERT INTO comments 
(id_product, id_user, comment_text, comment_created_at, id_first_comment)
VALUES ($1,$2,$3,CURRENT_TIMESTAMP,$4) RETURNING id_comment