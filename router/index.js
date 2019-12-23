var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql      = require('mysql');
var main = require('./main/main');
var email = require('./email/email');

router.use('/main', main);
router.use('/email', email);

router.get('/', function(req, res){
    console.log('router loaded...');
    res.sendFile(path.join(__dirname , "../public/main.html"));
})



module.exports = router;