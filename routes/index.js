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
router.get('/coding', url.coding)
router.get('/apply', url.apply)
router.get('/projects/draw', url.draw)
router.get('/projects/snake', url.snake)
router.get('/projects/firework', url.firework)

/// API
router.get('/api/schoolList', api.schoolList)
router.post('/api/application', api.application)
router.get('/api/applyList', api.applyList)
router.get('/api/deleteApply', api.deleteApply)


module.exports = router;
