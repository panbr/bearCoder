/**
 * 脚本
 * @author panbr
 * @time 2018-07-30 23:54:00
 */

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
var yPositions = Array(300).join(0).split('');

// 开始运行程序
run();

function run() {
    if (typeof Game_Interval != 'undefined') {
        clearInterval(Game_interval);
    }

    Game_Interval = setInterval(drawScreen, 50);
}

function drawScreen() {
    ctx.fillStyle = 'rgba(0,0,0,.05)';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#0f0';
    ctx.font = '14px Consolas';
    yPositions.map(function(y, index){
        var text = String.fromCharCode(1e2 + Math.random() * 50);
        var x = (index * 10) + 10;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 1e4) {
            yPositions[index] = 0;
        } else {
            yPositions[index] = y + 10;
        }
    })
}
