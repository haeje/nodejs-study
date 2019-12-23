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


router.post('/form', function(req, res){
    res.render('email.ejs', { "email": req.body.email});
})

router.post('/ajax', function(req, res){
    let responseData = {};
    const sql = `SELECT * FROM test WHERE name = '${req.body.email}'`;
    const loadData = connection.query(sql, function(err, rows) {
        if( err ) throw err;
        if( rows[0]){
            responseData = {
                result : "ok",
                data : rows[0].name
            }
        }else{
            responseData = {
                result : "ok",
                data : ""
            }
        }
        res.json(responseData);
      });
})

module.exports = router;