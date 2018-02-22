/**
 * 后台主程序
 * @author panbr
 * @time 2018-02-07 00:40:23
 */

var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./routes/');
var config = require('./config');

// Create App & SQLite
var app = module.exports = express();
var db = new sqlite3.Database(__dirname+'/db/school.db');


// Configuration
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'app')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    req.db = db;
    next();
});


// ROUTE
app.use(router);


// Start Server
app.listen(config.SERVE_PORT, function(req, res) {
    console.log("app is running at http://127.0.0.1:", config.SERVE_PORT);
})