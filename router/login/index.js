var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '111111',
    port : 3306,
    database : 'nodejsstudy'
});

connection.connect();

passport.serializeUser(function(user, done){
    console.log('serializeUser', user);
    done(null, user.id);
})

passport.deserializeUser(function(id, done){
    console.log('deserializeUser', id);
    done(null, id);
})

router.get('/', function(req, res){
    console.log('login get request');
    res.render('login.ejs');
})

passport.use('local-login',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    const sql = `select * from USERINFO where email = ?`;
    var query = connection.query(sql, [email], function(err, rows){
        
      if( err ) return done(err);
      if( rows.length ) {
        return done(null, {email, 'id': rows[0].uid});
      }else {
        return done(null, false, { message : 'your login info is no found >.<!' });
      }
    })
  }
));

router.post('/', function(req, res, next){
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            res.json(err);
            return;
        }
        if (!user) {
            res.json(info.message);
            return;
        }
        
        req.logIn(user, function(err) {
            if (err) { 
                next(err); 
                return;
            }
            res.json(user);
            return;
        });
      })(req, res, next);
}
);

module.exports = router;