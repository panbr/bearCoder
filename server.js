/**
 * 后台主程序
 * @author panbr
 * @time 2018-02-07 00:40:23
 */

var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./routes/');
var config = require('./config');

// Create App & SQLite
var app = module.exports = express();
var db = new sqlite3.Database(__dirname+'/db/school.db');

// log
var log4js = require('./logger');
var logger = log4js.getLogger();
log4js.useLogger(app, logger);

// Configuration
app.use(express.static(path.join(__dirname, 'app')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    if(JSON.stringify(req.body) !== '{}') {
        logger.info({
            time: new Date(),
            req_params: req.body
        });
    } 
    req.db = db;
    next();
});


// ROUTE
app.use(router);


// Start Server
app.listen(config.SERVE_PORT, function(req, res) {
    console.log("app is running at http://127.0.0.1:", config.SERVE_PORT);
})