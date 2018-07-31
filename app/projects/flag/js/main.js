/**
 * 飘扬的五星红旗
 * @author panbr
 * @time 2018-05-14 23:58:00
 */

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let width = 300;
let height = width * 2 / 3;
let w = width / 30; // 小网格的宽

// 画红色长方形
ctx.fillStyle = "red";
ctx.fillRect(210, 90, width, height);

let maxR = 0.12,
    minR = 0.06;
let maxX = 0.25,
    maxY = 0.25; // 大五星的位置
let minX = [0.50, 0.60, 0.60, 0.50],
    minY = [0.10, 0.20, 0.35, 0.45];

// 画大五角星
let ox = height * maxX + 210,
    oy = height * maxY + 90;
drawStar(ctx, ox, oy, height * minR, height * maxR, 0); // 绘制五角星

// 画小五角星
for(let i=0; i<4; i++) {
    let x = minX[i] * height + 210;
    let y = minY[i] * height + 90;
    let theta = Math.atan((oy - y) / (ox - x));
    drawStar(ctx, x, y, height * minR / 3, height * maxR / 3, theta);
}

function drawStar(cxt, x, y, r, R, rot) {
    cxt.beginPath();
    for(let i = 0; i < 5; i ++) {
        cxt.lineTo( Math.cos( (18 + i*72 - rot)/180 * Math.PI) * R + x, -Math.sin( (18 + i*72 - rot)/180 * Math.PI) * R + y);
        cxt.lineTo( Math.cos( (54 + i*72 - rot)/180 * Math.PI) * r + x, -Math.sin( (54 + i*72 - rot)/180 * Math.PI) * r + y);
    }
    cxt.closePath();
    cxt.lineWidth = 3;
    ctx.strokeStyle = '#ff0';
    cxt.fillStyle = "#ff0";
    cxt.lineJoin = "round";

    cxt.fill();
    cxt.stroke();
}

var timer = waveFlag(canvas, 20, 10, 150, 200, -0.1);

// 飘动
function waveFlag(canvas, wavelength, amplitude, period, shading, squeeze) {
    if (!squeeze)    squeeze    = 0;
    if (!shading)    shading    = 100;
    if (!period)     period     = 200;
    if (!amplitude)  amplitude  = 10;
    if (!wavelength) wavelength = canvas.width/10;

    let fps = 30;
    let ctx = canvas.getContext('2d');
    let od = ctx.getImageData(210, 90, width, height).data;

    return setInterval(function(){
        let id = ctx.getImageData(210, 90, width, height);
        let d = id.data;
        let now = (new Date)/period;
        for(let y=0; y<height; ++y){
            let lastO=0,shade=0;
            let sq = (y-height/2)*squeeze;
            for (let x=0;x<width;++x){
                let px  = (y*width + x)*4;
                let pct = x/width;
                let o   = Math.sin(x/wavelength-now)*amplitude*pct;
                let y2  = y + (o+sq*pct)<<0;
                let opx = (y2*width + x)*4;
                shade = (o-lastO)*shading;
                d[px  ] = od[opx  ]+shade;
                d[px+1] = od[opx+1]+shade;
                d[px+2] = od[opx+2]+shade;
                d[px+3] = od[opx+3];
                lastO = o;
            }
        }
        ctx.putImageData(id, 210, 90);
    }, 1000/fps);
}

