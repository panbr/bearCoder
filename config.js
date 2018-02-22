var path = require('path');

var BASE_PATH = path.join(__dirname, './');

module.exports = {
    DB_PATH: path.join(BASE_PATH, 'db'),         // 数据库地址
    ROUTE_PATH: path.join(BASE_PATH, 'routes'),  // 路由地址
    APP_PATH: path.join(BASE_PATH, 'app'),       // 应用地址

    // 服务端口
    SERVE_PORT: process.env.PORT || 3000,
}
