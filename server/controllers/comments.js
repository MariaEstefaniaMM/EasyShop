const express = require('express');
const comment = require('../helpers/models/comments');
const router = express.Router();
const isAuth = require('../middlewares/isAuth').isAuth;

router.get('/getProductComments',isAuth,(req,res)=>{ 
  console.log(req);
      comment.getProductComments(req.query.id_product).then((data) => {
          res.send({status:200, comments:data});
        }).catch((err) => {
          console.log(err);
          res.send({status:403, message: 'Error while getting product comments'})
        })    
});

router.post('/createComment',isAuth,(req,res)=>{
      console.log(req.body.id_product, req.user.id_user, req.body.comment_text, req.body.id_first_comment)
      comment.createComment(req.body.id_product, req.user.id_user, req.body.comment_text, req.body.id_first_comment).then((data) => {
        res.send({
          data:data,
          status:200});
      }).catch((err) => {
        console.log(err)
        res.send({status:403, message:'Fail to add the comment'});
      })
});

router.put('/updateComment',isAuth,(req,res)=>{
    console.log(req);
      console.log(req.body.comment_text, req.body.id_comment)
      comment.updateComment( req.body.comment_text, req.body.id_comment).then((data) => {
        res.send({
          data:data,
          status:200});
      }).catch((err) => {
        console.log(err)
        res.send({status:403, message:'Fail to update the comment'});
      })
  });

  router.post('/deleteComment', isAuth, (req, res) => {
    console.log(req.body.id_comment)
      comment.deleteComment(req.body.id_comment).then((data) => {
          console.log(data);
          res.send({status:200});
        }).catch((err) => {
          console.log(err);
          res.send({status:403, message:'Fail to delete the comment'})
        })
  });

module.exports = router;
