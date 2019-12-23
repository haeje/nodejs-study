var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var router = require('./router/index');




app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(router);

app.listen(3000, ()=>{
    console.log('CORS-enabled web server listening on port 3000')
})  