/**
 * 页面 URL
 */

var config = require('../config')

// 首页
exports.index = function(req, res){
    res.sendFile(config.APP_PATH + '/index.html');
};

// 学校分布地图
exports.map = function(req, res){
    res.sendFile(config.APP_PATH + '/map.html');
};

// 查看申请表
exports.applyList = function(req, res) {
    res.sendFile(config.APP_PATH + '/applyList.html')
}

// 在线编码器
exports.coding = function(req, res) {
    res.sendFile(config.APP_PATH + '/coding.html')
}

// 在线申请
exports.apply = function(req, res) {
    res.sendFile(config.APP_PATH + '/apply.html')
}

// 项目
exports.draw = function(req, res) {
    res.sendFile(config.APP_PATH + '/projects/draw/index.html')
}

exports.snake = function(req, res) {
    res.sendFile(config.APP_PATH + '/projects/snake/index.html')
}

exports.firework = function(req, res) {
    res.sendFile(config.APP_PATH + '/projects/firework/index.html')
}
