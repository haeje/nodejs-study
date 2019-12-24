var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    port : 3306,
    database : "nodejsstudy",
  });
  
  connection.connect();


router.get('/', function(req, res){
    var msg;
    var errMsg = req.flash('error');
    if(errMsg) msg = errMsg;
    res.render('join.ejs', {message : msg})
    // res.sendFile(path.join(__dirname, "../../public/join.html"));
})


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    const sql = `select * from USERINFO where email = ?`;
    var query = connection.query(sql, [email], function(err, rows){
      if( err ) return done(err);
      if( rows.length ) {
        console.log('exist user email');
        return done(null, false, {message : 'your email is alread used'});
      }else {
        const sql = `insert into userinfo set ?`;
        const obj = {email, password};
        var query = connection.query(sq, obj, function(err, rows){
          if( err ) throw err;
          return done(null, {"email" : email, 'id' : rows.insertId})
        })
      }
    })
    
  }
));

router.post('/', passport.authenticate('local', { successRedirect: '/main',
                                                        failureRedirect: '/join',
                                                        failureFlash: true })
);



// router.post('/', function(req, res){
//   const body = req.body;
//   const name = body.name;
//   const email = body.email;
//   const password = body.password;

//   // const sql = `INSERT INTO USERINFO(email, name, password) VALUES('${email}', '${name}', '${password}')`;
//   const sql = `INSERT INTO USERINFO set ?`;
//   const obj = {
//     name, email, password
//   }
//   connection.query(sql,obj, function(err, rows){
//     if( err) throw err;
//     console.log(rows.insertId, name);

//     res.render('hello.ejs', {name:name, id:rows.insertId});
    
//   })
  
// })

module.exports = router;