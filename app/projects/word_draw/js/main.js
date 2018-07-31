var position = {x: 0, y: window.innerHeight/2};
var counter = 0;
var minFontSize = 3;
var angleDistortion = 0;
var letters = "坚持一件你认为有价值的事情！";     //绘制的文本

var canvas;
var context;
var mouse = {x: 0, y: 0, down: false}

//初始化
function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener('mousemove',mouseMove,false);   //监听鼠标移动
    canvas.addEventListener('mousedown',mouseDown,false);   //监听鼠标按下
    canvas.addEventListener('mouseup',mouseUp,false);       //监听鼠标松开
    canvas.addEventListener('mouseout',mouseUp,false);      //监听鼠标离开
    canvas.addEventListener('dblclick',doubleClick,false);  //监听鼠标双击

    //监听可视窗口尺寸
    window.onresize = function(event) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

//鼠标移动函数
function mouseMove (event){
    mouse.x = event.pageX;
    mouse.y = event.pageY;
    draw();
}

//绘制
function draw() {
    if ( mouse.down ) {
        var d = distance( position, mouse );
        var fontSize = minFontSize + d/2;
        var letter = letters[counter];
        var stepSize = textWidth( letter, fontSize );

        if (d > stepSize) {
            console.log(d)
            //Math.atan2() 有两个值，分别用X和Y来自动调整对应的角度
            var angle = Math.atan2(mouse.y-position.y, mouse.x-position.x);

            context.font = fontSize + "px Georgia";
            context.fillStyle = "#fff";
            context.save();
            context.translate( position.x, position.y);     //改变位置
            context.rotate( angle );                        //旋转角度
            context.fillText(letter,0,0);                   //绘制每一个字符
            context.restore();

            counter++;
            if (counter > letters.length-1) {               //循环绘制文本字符串
                counter = 0;
            }

            position.x = position.x + Math.cos(angle) * stepSize;
            position.y = position.y + Math.sin(angle) * stepSize;
        }
    }
}

//决定绘制文本字体大小
function distance(pt, pt2){
    var xs = 0;
    var ys = 0;
    xs = pt2.x - pt.x;
    xs = xs * xs;
    ys = pt2.y - pt.y;
    ys = ys * ys;
    return Math.sqrt( xs + ys );    //返回正确舍入的一个double值的正平方根
}

//鼠标按下函数
function mouseDown(event){
    mouse.down = true;
    position.x = event.pageX;       //从新定义x坐标位置
    position.y = event.pageY;       //从新定义y坐标位置
    document.getElementById('info').style.display = 'none'; //隐藏提示文字内容
}

//鼠标松开函数
function mouseUp(event){
    mouse.down = false;
}

//鼠标双击函数
function doubleClick(event) {
    canvas.width = canvas.width;
}

//文本宽度函数（移动速度决定文本大小）
function textWidth( string, size ) {
    context.font = size + "px Georgia";
    if ( context.fillText ) {
        return context.measureText( string ).width;         //返回文本宽度
    } else if ( context.mozDrawText) {
        return context.mozMeasureText( string );
    }
};

init();
