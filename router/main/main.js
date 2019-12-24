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
    console.log('router loaded...');
    res.sendFile(path.join(__dirname , "../../public/main.html"));
    // res.sendFile("../public/main.html");
})





module.exports = router;