let User = require('./models/users');
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;

module.exports = new localStrategy({
    emailField: 'email',
    passwordField: 'password'
},function(email, password, done) {
    User.getUserByEmail(email).then((user)=>{
        if (user.error) {
            return done(null, false);
        }
        User.comparePassword(password, user.user_password).then((isMatch)=>{
            if (isMatch){
                return done(null, user);
            }else
                return done(null, false);
        }).catch((err)=>{
            return done(null, false);
        });
    }).catch((err)=>{
        return done(null, false);
    });
});