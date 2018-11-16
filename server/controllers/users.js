const express = require('express');
let router = express.Router();
const isAuth = require('../middlewares/isAuth').isAuth;
let user = require('../helpers/models/users');

router.put('/updateUser',isAuth, (req,res)=>{
    console.log(req.body.user_name, req.body.user_lastname, req.body.user_email, req.body.user_photo, req.body.user_address, req.body.user_phone, req.user.id_user)
    if (req.body.user_email==req.user.user_email){
      user.updateUser(req.body.user_name, req.body.user_lastname, req.body.user_email, req.body.user_photo, req.body.user_address, req.body.user_phone, req.user.id_user)
      .then((data) => {
        console.log('Updated-correo es el mismo')
        res.send({
          data:data,
          status:200});
      }).catch((err) => {
        console.log(err)
        res.send({status:403, message:'Could not update user'});
      })
    }else {
        user.checkUser(req.body.user_email).then((data) => {
        console.log(data)
        if(data.length==0){
          user.updateUser(req.body.user_name, req.body.user_lastname, req.body.user_email, req.body.user_photo, req.body.user_address, req.body.user_phone, req.user.id_user)
          .then((data) => {
            console.log('Updated-cambie por un correo no repetido')
            res.send({
              data:data,
              status:200});
          }).catch((err) => {
            console.log(err)
            res.send({status:403, message:'Could not update user'});
          })
      }else{
          res.send({
              status: 403,
              message:'Username or email already used.'
          });
        }
  }).catch((err) => {
      console.log(err);
      res.send({
          status:403,
          message:'Sign up failed',
      });
    })
  }
})

router.post('/deleteUser',isAuth, (req, res) => {
  console.log(req.body.user_password, req.user.user_password)
  user.comparePassword(req.body.user_password, req.user.user_password).then((isMatch)=>{
    if (isMatch){
      user.deleteUser(req.user.id_user).then((data) => {
        console.log(data);
        res.send({status:200});
      }).catch((err) => {
        console.log(err);
        res.send({status:403, message:'Delete user failed'})
      })
    }else
        res.send({status:403, message:'Incorrect Password'})
    }).catch((err)=>{
      console.log(err);
    });
    
});

router.put('/updatePassword', isAuth, (req, res)=>{
  user.comparePassword(req.body.old_password, req.user.user_password).then((isMatch)=>{
    if (isMatch){
      user.updatePassword(req.body.new_password, req.user.id_user).then((data) => {
        console.log(data);
        res.send({status:200,
                  message:'Password Updated'});
      }).catch((err) => {
        console.log(err);
        res.send({status:403, message:'Update password failed'})
      })
    }else{
        console.log('Incorrect Password');
        res.send({status:403, message:'Incorrect Password'})
    }}).catch((err)=>{
      console.log(err);
    });
});

module.exports = router;