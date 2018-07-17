/**
 * 你画我猜
 * @author panbr
 * @time 2018-05-09 01:15:00
 */

// 配置
let op = {
	isWrite: false,     // 是否在写
	writeWidth: 6,      // 画笔粗细
	writeColor: '#000', // 画笔颜色
}

// 定义绘画类
class Draw {
	constructor(id) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");

    	this.initStyle();
    	this.event();
	}

	// 初始化
	initStyle() {
		this.ctx.lineWidth = op.writeWidth;
		this.ctx.strokeStyle = op.writeColor;
		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';
	}

	// 清空画布
	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	// 开始写
	start(point) {
		op.isWrite = true;
		this.ctx.beginPath();
        this.ctx.moveTo(point.x, point.y)
	}

	// 写
	writing(point) {
		this.ctx.lineTo(point.x, point.y);
        this.ctx.stroke();
	}

	// 结束写
	end() {
		op.isWrite = false;
	}

	// 监听事件
	event() {
		// 鼠标点击
		this.canvas.addEventListener('mousedown', e => {
			let point = {
				x: e.offsetX,
	        	y: e.offsetY
			}
			this.start(point);
		});

		// 鼠标抬起
		this.canvas.addEventListener('mouseup', e => {
			let point = {
				x: e.offsetX,
	        	y: e.offsetY
			}
			this.end(point);
		});

		// 鼠标移动
		this.canvas.addEventListener('mousemove', e => {
			if (op.isWrite) {
		        let point = {
		            x: e.offsetX,
		            y: e.offsetY
		        }
		        this.writing(point);
		     }
		});
	}
}

window.onload = () => {
	// 创建一个画布
	let draw = new Draw('canvas');

	initEvent(draw);
}

// 事件列表
function initEvent(draw) {
	let clear = document.getElementById('clear'); // 清屏
	let eraser = document.getElementById('eraser'); // 橡皮
	let black = document.getElementById('black'); // 黑色
	let red = document.getElementById('red'); // 红色
	let blue = document.getElementById('blue'); // 蓝色
	let yellow = document.getElementById('yellow'); // 黄色
	let cuxi = document.getElementById('cuxi'); // 画笔粗细


	clear.addEventListener('click', () => {
		draw.clear();
	})

	eraser.addEventListener('click', () => {
		op.writeColor = 'white';
		draw.initStyle();
	})

	black.addEventListener('click', () => {
		op.writeColor = 'black';
		draw.initStyle();
	})

	red.addEventListener('click', () => {
		op.writeColor = 'red';
		draw.initStyle();
	})

	blue.addEventListener('click', () => {
		op.writeColor = 'blue';
		draw.initStyle();
	})

	yellow.addEventListener('click', () => {
		op.writeColor = 'yellow';
		draw.initStyle();
	})

	cuxi.addEventListener('change', () => {
		op.writeWidth = cuxi.value * 2;
		draw.initStyle();
	})
}
