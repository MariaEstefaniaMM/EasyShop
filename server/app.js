const express = require('express');
const jwt = require('express-jwt');
const app = express();
const config = require('./helpers/config/config');
let passport = require('passport');
var methodOverride = require('method-override');
var cors = require('cors');

app.use('/views', express.static(__dirname + '/public'));
app.use(express.json({limit:'mb'}));
app.use(methodOverride());
app.use(cors());
app.use('*',cors());

app.use(express.urlencoded({limit:'mb',extended:true}));
app.use(jwt({
    secret: config.secret
  }).unless({
    path: ['/session/login', '/session/signup','/products/getAll','/', '/favicon.ico']
  }));;
app.use(passport.initialize());
app.use(passport.session());
app.use('/',require('./routes'));

app.get('/', function (req, res) {
    res.redirect('views/index.html');
});

app.use(function (err, req, res, next) {
  console.log(err);
    if (err.name === 'UnauthorizedError') {//token no es valido o hubo un error en la firma o token no existe
      res.status(401).send({
        message: 'invalid token...',
        status:401
      });
    }
  });

passport.use(require('./helpers/localStrategy'));
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});
app.listen(config.port, function () {
    console.log('Example app listening on port 3000!');
});