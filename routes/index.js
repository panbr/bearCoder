/**
 * 路由管理
 */
var express = require('express');
var url = require('./url');
var api = require('./api');

var router = express.Router();

/// ROUTE
router.get('/', url.index)
router.get('/map', url.map)
router.get('/applyList', url.applyList)

/// API
router.get('/api/schoolList', api.schoolList)
router.post('/api/application', api.application)
router.get('/api/applyList', api.applyList)


module.exports = router;
