const express = require('express');
let router = express.Router();
const isAuth = require('../middlewares/isAuth').isAuth;
let user = require('../helpers/models/users');
let config = require('../helpers/config/config');
const jwt  = require('jsonwebtoken');

router.put('/updateUser',isAuth, (req,res)=>{
    console.log(req.body.user_name, req.body.user_lastname, req.body.user_email, req.body.user_address, req.body.user_phone, req.user.id_user, req.body.username)
    if (req.body.user_email==req.user.user_email && req.body.username==req.user.username){
      user.updateUser(req.body.user_name, req.body.user_lastname, req.body.user_email, req.body.user_photo, req.body.user_address, req.body.user_phone, req.user.id_user, req.body.username)
      .then((data) => {
        console.log('Updated-correo y usuario es el mismo')
        user.getUserByEmail(req.user.user_email).then((user)=>{
          let userWithoutPhoto= JSON.parse(JSON.stringify(user));
          userWithoutPhoto.user_photo='';
            
          let jsonWebToken = jwt.sign(userWithoutPhoto,config.secret);
            console.log(jsonWebToken);
            res.send({
                data: data,
                status: 200,
                message:'Profile Updated',
                user: user,
                token:jsonWebToken
            });
      }).catch((err)=>{
          return done(null, false);
      });
      }).catch((err) => {
        console.log(err)
        res.send({status:403, message:'Could not update user'});
      })
    }else {
        user.checkUser(req.body.user_email, req.body.username).then((data) => {
        console.log(data)
        if(data.length==0){
          user.updateUser(req.body.user_name, req.body.user_lastname, req.body.user_email, req.body.user_photo, req.body.user_address, req.body.user_phone, req.user.id_user, req.body.username)
          .then((data) => {
            console.log('Updated-cambie por un correo no repetido- data 0')
            user.getUserByEmail(req.body.user_email).then((user)=>{
            let userWithoutPhoto= JSON.parse(JSON.stringify(user));
            userWithoutPhoto.user_photo='';
            
            let jsonWebToken = jwt.sign(userWithoutPhoto,config.secret);
                console.log(jsonWebToken);
                res.send({
                    data: data,
                    status: 200,
                    message:'Profile Updated',
                    user: user,
                    token:jsonWebToken
                });
          }).catch((err)=>{
            res.send({status:403, message:'Could not get user'});
          });
          }).catch((err) => {
            console.log(err)
            res.send({status:403, message:'Could not update user'});
          })
      }else if(data.length==1 && data[0].id_user==req.user.id_user){
        user.updateUser(req.body.user_name, req.body.user_lastname, req.body.user_email, req.body.user_photo, req.body.user_address, req.body.user_phone, req.user.id_user, req.body.username)
        .then((data) => {
          console.log('Updated-cambie por un correo no repetido')
          user.getUserByEmail(req.body.user_email).then((user)=>{
          let userWithoutPhoto= JSON.parse(JSON.stringify(user));
          userWithoutPhoto.user_photo='';
          
          let jsonWebToken = jwt.sign(userWithoutPhoto,config.secret);
              console.log(jsonWebToken);
              res.send({
                  data: data,
                  status: 200,
                  message:'Profile Updated',
                  user: user,
                  token:jsonWebToken
              });
        }).catch((err)=>{
          res.send({status:403, message:'Could not get user'});
        });
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
          message:'Update user failed',
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
        user.getUserByEmail(req.user.user_email).then((user)=>{
          let userWithoutPhoto= JSON.parse(JSON.stringify(user));
          userWithoutPhoto.user_photo='';
            
          let jsonWebToken = jwt.sign(userWithoutPhoto,config.secret);
            console.log(jsonWebToken);
            res.send({
                status: 200,
                message:'Password Updated',
                user: user,
                token:jsonWebToken
            });
      }).catch((err)=>{
        res.send({status:403, message:'Cant find the user'})
      });
        
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