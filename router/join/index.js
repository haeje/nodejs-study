var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    port : 3306,
    database : "nodejsstudy",
  });
  
  connection.connect();


router.get('/', function(req, res){
    
    res.sendFile(path.join(__dirname, "../../public/join.html"));
})

router.post('/', function(req, res){
  const body = req.body;
  const name = body.name;
  const email = body.email;
  const password = body.password;

  // const sql = `INSERT INTO USERINFO(email, name, password) VALUES('${email}', '${name}', '${password}')`;
  const sql = `INSERT INTO USERINFO set ?`;
  const obj = {
    name, email, password
  }
  connection.query(sql,obj, function(err, rows){
    if( err) throw err;
    console.log(rows.insertId, name);

    res.render('hello.ejs', {name:name, id:rows.insertId});
    
  })
  
})

module.exports = router;