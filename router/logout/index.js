var express = require('express');
var app = express();
var router = express.Router();

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/main');
  });


  module.exports = router;