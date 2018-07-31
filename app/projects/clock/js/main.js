var obj = document.getElementById('clock');
var ctx = obj.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 200;  //比例

//画圆
function drawBackground() {
    ctx.save();
    ctx.translate(r, r);
    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
    //以0，0为原点，r为半径，0为起始角，2*Math.PI为结束角，顺时针画圆
    // ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
    // ctx.stroke();

    var hourNumber = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = 18 * rem + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    //画出1-12的数字
    hourNumber.forEach(function (number, i) {
        var rad = 2 * Math.PI / 12 * i;
        var x = Math.cos(rad) * (r - 30 * rem);
        var y = Math.sin(rad) * (r - 30 * rem);
        ctx.fillText(number, x, y);
    });
    //画出秒针走动的60个点
    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18 * rem);
        var y = Math.sin(rad) * (r - 18 * rem);
        ctx.beginPath();
        if (i % 5 === 0) {
            ctx.fillStyle = '#000';
            ctx.arc(x, y, 2 * rem, 0, 2, 2 * Math.PI, false);
        } else {
            ctx.fillStyle = '#ccc';
            ctx.arc(x, y, 2 * rem, 0, 2, 2 * Math.PI, false);
        }
        ctx.fill();
    }
}

//绘制时针
function drawHour(hour, minute) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * minute;
    ctx.rotate(rad + mrad);
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r / 2);
    ctx.stroke();
    ctx.restore();
}

//绘制分针
function drawMinute(minute) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minute;
    ctx.rotate(rad);
    ctx.lineWidth = 3 * rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -r + 30 * rem);
    ctx.stroke();
    ctx.restore();
}

//绘制秒针
function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#c14443';
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.moveTo(-2, 20 * rem);
    ctx.lineTo(2, 20 * rem);
    ctx.lineTo(1, -r + 18 * rem);
    ctx.lineTo(-1, -r + 18 * rem);
    ctx.fill();
    ctx.restore();
}

//画时钟上的中心白色原点
function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    drawBackground();
    drawHour(hour, minutes);
    drawMinute(minutes);
    drawSecond(seconds);
    drawDot();
    ctx.restore();
}

function digitalTime() {
    var elt = document.getElementById("digital"); // 通过id= "clock"找到元素
    var now = new Date(); // 得到当前时间
    elt.innerHTML = now.toLocaleTimeString(); //让elt来显示它
    setTimeout(displayTime,1000); //在1秒后再次执行
}

function displayTime() {
    draw();
    digitalTime();
}

setInterval(displayTime, 1000);   //每秒执行一次
