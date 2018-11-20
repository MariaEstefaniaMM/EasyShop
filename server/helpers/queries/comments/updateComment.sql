UPDATE comments SET 
comment_text =$1, comment_updated_at = CURRENT_TIMESTAMP
WHERE id_comment = $2