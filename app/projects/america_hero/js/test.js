
// 创建画布
let canvas = document.getElementById('canvas');
let cxt = canvas.getContext('2d');

let ox = 480;
let oy = 300;

function drawCircle(x, y, r, color) {
	cxt.beginPath();
	cxt.fillStyle = color;
	cxt.arc(x, y, r, 0, 2*Math.PI);
	cxt.fill();
	cxt.stroke();
}

function drawStar(x, y, r, R, rot, color) {
	cxt.beginPath();
	for(let i = 0; i < 6; i ++) {
        cxt.lineTo( Math.cos( (18 + i*72 - rot)/180 * Math.PI) * R + x, -Math.sin( (18 + i*72 - rot)/180 * Math.PI) * R + y);
        cxt.lineTo( Math.cos( (54 + i*72 - rot)/180 * Math.PI) * r + x, -Math.sin( (54 + i*72 - rot)/180 * Math.PI) * r + y);
    };
    cxt.fillStyle = color;
    cxt.fill();
    cxt.stroke();
}

function rotate() {
	cxt.clearRect(0, 0, canvas.width, canvas.height);
	cxt.translate(ox, oy);
	cxt.rotate(Math.PI/180*5);
	cxt.translate(-ox, -oy);
	draw();
}

function draw() {
	drawCircle(ox, oy, 120, '#dd5870');
	drawCircle(ox, oy, 100, '#e0dedf');
	drawCircle(ox, oy, 80, '#dd5870');
	drawCircle(ox, oy, 60, '#2773d3');
	drawStar(ox, oy, 30, 60, 0, '#dedce1');
}

setInterval(rotate, 50);
