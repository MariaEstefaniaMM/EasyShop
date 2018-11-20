const express = require('express');
const passport = require('passport');
const auth = require('./../middlewares/isAuth');
const jwt  = require('jsonwebtoken');
let config = require('../helpers/config/config');
let router = express.Router();
let user = require('../helpers/models/users');

router.post('/login', auth.isLogged, function (req, res, next) {
    passport.authenticate('local',{session: false}, function (err, user, info) {
        console.log(user);
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({
                status: 401,
                message: 'Incorrect Password',
            });
        }
        req.logIn(user,{session: false}, function (err) {
            if (err) {
                console.log(err);
                return res.send({
                    status: 500,
                    message: 'Could not log in user.'
                });
            }      
            
            let userWithoutPhoto= JSON.parse(JSON.stringify(user));
            userWithoutPhoto.user_photo='';
            
            let jsonWebToken = jwt.sign(userWithoutPhoto,config.secret);
            res.send({
                status: 200,
                message:'Login Successful.',
                user: user,
                token:jsonWebToken
            });
        });
    })(req, res, next);
});

router.post('/signup',auth.isLogged,function(req, res, next) {
    console.log('postSignUp'+req.body.name+req.body.lastName+req.body.email+ req.body.password+ req.body.username)
    user.checkUser( req.body.email, req.body.username).then((data) => {
        console.log(data)
        if(data.length==0){
            user.signup(req.body.name, req.body.lastName, req.body.email, req.body.password, req.body.photo, req.body.address, req.body.phone, req.body.username)
            .then((data) => {
                console.log('SignUp Successful');
                res.send({
                    status: 200,
                    message:'Sign Up Successful'
                });
            }).catch((err) => {
                console.log(err)
            });
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
});

router.get('/logout', auth.isAuth, function (req, res) {
    res.status(200).send({
        status: 'Bye!'
    });
});

module.exports = router;