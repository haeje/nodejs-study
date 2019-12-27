var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    port : 3307,
    database : "study_db",
  });
  
  connection.connect();

router.get('/', function(req, res){
  console.log('/main.js', req.user);
  
  const id = req.user;
  // if( !id ) res.redirect('/login');
   res.render('main.ejs', {'id':req.user})
})





module.exports = router;