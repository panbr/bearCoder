/**
 * 美国队长盾牌
 * @author: panbr
 * @time: 2018-05-21 23:05:00
 */

// 获取画布
let canvas = document.getElementById('canvas');
let cxt = canvas.getContext('2d');

let ox = 350;
let oy = 300;
let or = 120;

setInterval(rotate, 50);

// 画盾牌
function draw() {
	drawCircle(ox, oy, or, '#dd5870');
	drawCircle(ox, oy, or-20, '#e0dedf');
	drawCircle(ox, oy, or-40, '#dd5870');
	drawCircle(ox, oy, or-60, '#2773d3');
	drawStar(ox, oy, (or-60)/2, or-60, 0, '#dedce1');
}

// 旋转
function rotate() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    cxt.translate(ox, oy); // 将绘图原点移到画布中点
    cxt.rotate((Math.PI/180)*5); // 旋转角度
    cxt.translate(-ox, -oy); // 将画布原点移动
    draw();
}


// 画圆
function drawCircle(x, y, r, color) {
	cxt.beginPath();
	cxt.fillStyle = color;
	cxt.arc(x, y, r, 0, 2 * Math.PI);
	cxt.fill();
	cxt.stroke();
}

// 画五角星
function drawStar(x, y, r, R, rot, color) {
    cxt.beginPath();
    for(let i = 0; i < 5; i ++) {
        cxt.lineTo( Math.cos( (18 + i*72 - rot)/180 * Math.PI) * R + x, -Math.sin( (18 + i*72 - rot)/180 * Math.PI) * R + y);
        cxt.lineTo( Math.cos( (54 + i*72 - rot)/180 * Math.PI) * r + x, -Math.sin( (54 + i*72 - rot)/180 * Math.PI) * r + y);
    };
	cxt.fillStyle = color;
	cxt.fill();
    cxt.stroke();
}
