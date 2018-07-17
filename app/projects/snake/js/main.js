/**
 * 贪吃蛇游戏
 * @author panbr
 * @time 2018-05-07 00:15:00
 */

// 创建画布
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// 构造方块对象
class Rect {
	constructor(x, y, w, h, color) {
		this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
	}

	// 画方块
	draw() {
		ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.stroke();
	}
}

// 构造蛇对象
class Snake {
	constructor() {
		// 存放组成蛇的方块对象
        this.snakeArray = [];
        
        // 画出4个方块组成蛇身，设置成灰色
        for(var i = 0; i < 4; i++) {
            var rect = new Rect(i*20, 0, 20, 20, "gray");
            this.snakeArray.splice(0, 0, rect); // 保证蛇头出现在数组第一个位置
        }
        
        // 把数组第一个作为蛇头，蛇头设成红色
        this.head = this.snakeArray[0]; // 蛇头
        this.head.color = "red";
        
        // 给定初始位置向右(右箭头39)
        this.direction = 39;
	}

	// 画蛇
	draw() {
		for (var i = 0; i < this.snakeArray.length; i++) {
            this.snakeArray[i].draw();
        }
	}

	// 蛇的移动
	move() {
		/**
		 * 1、画一个灰色的方块，位置与蛇头重叠
		 * 2、将这个方块插到数组中蛇头后面一个的位置
		 * 3、砍去末尾的方块
		 * 4、将蛇头向设定方向移动一格
		 */
		var rect = new Rect(this.head.x, this.head.y, this.head.w, this.head.h, "gray");
    	this.snakeArray.splice(1, 0, rect);

        // 设置蛇的运动方向
        switch(this.direction) {
            case 37: // 左
                this.head.x -= this.head.w;
                break;
            case 38: // 上
                this.head.y -= this.head.h;
                break;
            case 39: // 右
                this.head.x += this.head.w;
                break;
            case 40: // 下
                this.head.y += this.head.h;
                break;
            default:    
                break;
        }

        /**
         * 判断是否吃到食物(isEat)
         * (1)吃到, 则食物重新给位置，蛇身边长
         * (2)没吃到, 则末尾砍掉一节，蛇长度不变
         */
        if(isEat()){
            food = new getRandomFood();
        } else {
            this.snakeArray.pop();
        }

        /**
         * 判断游戏结束
         * 1、撞墙
         * 2、撞自己
         */
        if(this.head.x > (canvas.width-20) || this.head.x < 0 || this.head.y > (canvas.height-20) || this.head.y < 0){
        	gameOver(snake);
        	clearInterval(timer);
    	};

        for(var i = 1; i < this.snakeArray.length; i++) {
        	if(this.snakeArray[i].x == this.head.x && this.snakeArray[i].y == this.head.y){
            	gameOver(snake);
            	clearInterval(timer);
        	}
    	}
	}
}

// 画出初始的蛇
var snake = new Snake();
snake.draw();

// 画出初始的食物
var food = new getRandomFood();

// 定时器
var timer = runTime();

// 键盘事件，其中的if判定是为了让蛇不能直接掉头
document.onkeydown = function(e) {
	e.preventDefault();

    switch(e.keyCode) {
        case 37: // 左
            if(snake.direction !== 39) {
                snake.direction = 37;
            }
            break;
        case 38: // 上
            if(snake.direction !== 40) {
                snake.direction = 38;
            }
            break;
        case 39: // 右
            if(snake.direction !== 37) {
                snake.direction = 39;
            }
            break;
        case 40: // 下
            if(snake.direction !== 38) {
                snake.direction = 40;
            }
            break;
        case 32: // 空格暂停
        	pause();
        	break;
    }
}

// 定时器
function runTime() {
	return setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        food.draw();
        snake.move();
        snake.draw();
        record(snake);
    }, 200);
}

// 构建食物对象
function getRandomFood() {
    
    var isOnSnake = true; // 判定食物是否出现在蛇身上
    
    // 设置食物出现的随机位置
    while(isOnSnake){
        isOnSnake = false; // 执行后先将判定条件设置为false

        var indexX = getNumberInRange(0, canvas.width/20-1);
        var indexY = getNumberInRange(0, canvas.height/20-1);
        var rect = new Rect(indexX*20, indexY*20, 20, 20, "green");
        for (var i = 0; i < snake.snakeArray.length; i++) {
            if(snake.snakeArray[i].x == rect.x && snake.snakeArray[i].y == rect.y){
                isOnSnake = true; //如果判定重合，将其设置为true，使随机数重给
                break;
            }
        }
    }
    return rect;
}

// 随机函数，获得[min,max]范围的值
function getNumberInRange(min, max) {
    var range = max - min;
    var r = Math.random();
    return Math.round(r * range + min);
}

// 判定吃到食物，即蛇头坐标与食物坐标重合
function isEat() {
    if(snake.head.x == food.x && snake.head.y == food.y){
        return true;
    } else {
        return false;
    }
}

// 记录分数
function record(snake) {
	var record = snake.snakeArray.length-4;
	ctx.font="18px Arial";
	ctx.fillText("分数：" + record, canvas.width-100, 30);
}

// 游戏结束
function gameOver(snake) {
	var record = snake.snakeArray.length-4;
	ctx.font="46px Arial";
	ctx.fillText("游戏结束！分数：" + record, canvas.width/2-200, canvas.height/2-30);
}

// 游戏暂停
var timeFlag = true;
function pause() {
	if(timeFlag) {
		clearInterval(timer);
		timeFlag = false;
	} else {
		timer = runTime();
		timeFlag = true;
	}
}

