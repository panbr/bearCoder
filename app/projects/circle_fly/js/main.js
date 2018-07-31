var loopId, canvas, ctx, spaceship, amount, starColor, mousePos, cometPathRadius, unit, stars, planets, smokeBubbles;

//Customization
amount = 20;

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

function init() {
  //Get canvas & context
  canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  //initialise animation & variables
  initialiseElements();
  startAnimation();

  canvas.addEventListener('mouseclick', function(evt) {
    mousePos = getMousePos(canvas, evt);
  }, false);

}

function initialiseElements() {
  stars = [];
  planets = [];
  smokeBubbles = [];
  unit = calculateUnit();
  maxRadius = unit / 50;
  spaceship = new Spaceship();
  for (var i = 0; i <= amount; i++) {
    stars.push(new Star);
  }
  planetLeft = new Planet('left', 'boy');
  planetRight = new Planet('right', 'girl');
}

function animationLoop(timeStamp) {
  // 1 - Clear & resize
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  unit = calculateUnit();
  // 2 Draw & Move
  drawScene();
  // call again mainloop after 16.6ms
  //(corresponds to 60 frames/second)
  id = requestAnimationFrame(animationLoop);
}

function startAnimation() {
  loopId = requestAnimationFrame(animationLoop);
}

function stopAnimation() {
  if (loopId) {
    cancelAnimationFrame(loopId);
  }
}

//Drawing functions

function drawScene() {
  drawBackground();
  drawPlanets();
  drawBubbles();
  drawSpaceship();
}

function drawBackground() {
  for (var i = 0; i <= amount; i++) {
    stars[i].draw();
    stars[i].update();
  }
}

function drawPlanets() {
  planetLeft.draw();
  planetRight.draw();
  planetLeft.update();
  planetRight.update();
}

function drawSpaceship() {
  spaceship.draw();
  spaceship.update();
}

function drawBubbles() {
  for (var i = 0; i < smokeBubbles.length; i++) {
    if (smokeBubbles[i].toDelete()) {
      smokeBubbles.splice(i, 1);
    } else {
      smokeBubbles[i].draw();
      smokeBubbles[i].update();
    }
  }
}

//Object classes

function Star() {
  var _this = this;

  //Constructor
  (function() {
    randomInitialise();
  })();

  _this.update = function() {
    if (_this.radius < 0) {
      randomInitialise();
    }
    _this.speedGrowth = _this.radius < 0 || _this.radius >= _this.maxGrowth ? -_this.speedGrowth : _this.speedGrowth;
    _this.speedOpacity = _this.opacity < 0 || _this.opacity >= 1 ? -_this.speedOpacity : _this.speedOpacity;
    _this.radius += _this.speedGrowth;
    _this.opacity += _this.speedOpacity;
  }

  _this.draw = function() {
    ctx.save();

    ctx.beginPath();
    ctx.arc(_this.x, _this.y, Math.abs(_this.radius), 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,290,' + _this.opacity + ')';
    ctx.fill();

    ctx.restore();
  }

  function randomInitialise() {
    _this.x = Math.random() * canvas.width;
    _this.y = Math.random() * canvas.height;
    _this.radius = 0;
    _this.opacity = 0;
    _this.maxGrowth = Math.random() * maxRadius;
    _this.speedGrowth = Math.random() * 0.5;
    _this.speedOpacity = 1 / (_this.maxGrowth / _this.speedGrowth);
  }
}

function Spaceship() {
  var _this = this;

  //Constructor
  (function() {
    randomInitialise();
  })();

  _this.update = function() {
    _this.cometPathRadius = unit;
    _this.radius = unit / 30;
    var newPos = lemniscate(_this.cometPathRadius, _this.count);
    _this.x = newPos.x;
    _this.y = newPos.y;
    _this.degrees = calculateAngle(this.x, this.y);
    _this.count += _this.step;
    _this.fireMovement = _this.fireMovement > 1.2 ? 1 : _this.fireMovement + _this.fireSpeed;
    _this.smokecounter -= _this.smokecounterStep;
    if (_this.smokecounter < 0 && smokeBubbles.length < 10) {
      smokeBubbles.push(new SmokeBubble(_this.x, _this.y, _this.degrees));
      _this.smokecounter = _this.smokecounterInitial;
    }
  }

  _this.draw = function() {
    ctx.save();

    ctx.translate((canvas.width / 2) + _this.x + (_this.radius / 2), (canvas.height / 2) + _this.y);

    ctx.rotate(_this.degrees);

    //Fire
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(-_this.radius * 4, 0, _this.radius * _this.fireMovement, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(-_this.radius * 4, 0, _this.radius * 0.9 * _this.fireMovement, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(-_this.radius * 4, 0, _this.radius * 0.7 * _this.fireMovement, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();

    //Pointy top
    ctx.fillStyle = '#2B2A29';
    ctx.beginPath();
    ctx.arc(_this.radius, 0, _this.radius * 2, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(_this.radius * 3.4, 0, _this.radius * 0.8, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(_this.radius * 4.5, 0, _this.radius * 0.3, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();

    //Body
    ctx.beginPath();
    ctx.fillStyle = 'grey';
    ctx.fillRect(_this.radius, -_this.radius * 2, -_this.radius * 5, _this.radius * 4);
    ctx.closePath();

    //Window
    ctx.fillStyle = '#2B2A29';
    ctx.beginPath();
    ctx.arc(-_this.radius * 0.5, 0, _this.radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'lightblue';
    ctx.beginPath();
    ctx.arc(-_this.radius * 0.5, 0, _this.radius * 0.8, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();

    //Wings
    ctx.strokeStyle = '#2B2A29';
    ctx.lineWidth = _this.radius / 2;
    ctx.beginPath();
    ctx.moveTo(-_this.radius * 2.5, 0);
    ctx.lineTo(-_this.radius * 6, 0);
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = '#2B2A29';
    ctx.beginPath();
    ctx.moveTo(-_this.radius * 2.5, _this.radius * 2);
    ctx.lineTo(-_this.radius * 4, _this.radius * 3);
    ctx.lineTo(-_this.radius * 6, _this.radius * 2.5);
    ctx.lineTo(-_this.radius * 6, _this.radius * 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-_this.radius * 2.5, -_this.radius * 2);
    ctx.lineTo(-_this.radius * 4, -_this.radius * 3);
    ctx.lineTo(-_this.radius * 6, -_this.radius * 2.5);
    ctx.lineTo(-_this.radius * 6, -_this.radius * 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  _this.getSpaceShipPosition = function() {
    return {
      x: _this.x + (canvas.width / 2),
      y: _this.y + (canvas.height / 2)
    }
  }

  function randomInitialise() {
    _this.x = Math.random() * canvas.width;
    _this.y = Math.random() * canvas.height;
    _this.cometPathRadius = unit;
    _this.radius = unit / 30;
    _this.fireMovement = 1;
    _this.fireSpeed = 0.03;
    _this.count = 0;
    _this.step = 0.02;
    _this.smokecounterInitial = 1;
    _this.smokecounter = _this.smokecounterInitial;
    _this.smokecounterStep = 0.4;
  }

  function calculateAngle(xPos, yPos) {
    var degrees;
    var nextPos = lemniscate(_this.cometPathRadius, _this.count + _this.step);
    var deltaY = (nextPos.y - yPos);
    var deltaX = (nextPos.x - xPos);
    degrees = Math.atan2(deltaY, deltaX);
    return degrees
  }
}

function Planet(side, gender) {
  var _this = this;

  //Constructor
  (function() {
    randomInitialise();
  })();

  function randomInitialise() {
    _this.radius = unit / 4.5;
    _this.craterDegrees = Math.random() * 180 / Math.PI;
    _this.side = side;
    _this.pos = _this.side === 'left' ? unit : -unit;
    _this.look = canvas.width / 2 > canvas.width / 2 - _this.pos ? 'right' : 'left';
    _this.gender = gender;
    _this.blinkMaxRandomCounter = 100;
    _this.blinkCounter = Math.random() * _this.blinkMaxRandomCounter;
    _this.blinkCounterStep = 0.05;
    _this.blinking = false;
    _this.blinkLength = 7;
    _this.blinkLengthCounter = _this.blinkLength;
  }

  _this.update = function() {
    _this.pos = _this.side === 'left' ? unit : -unit;
    _this.radius = unit / 4.5;
    calculateMouthLength();
    if (!_this.blinking && _this.blinkCounter > 0) {
      _this.blinkCounter -= _this.blinkLength = 0.5;
    } else {
      _this.blinkCounter = Math.random() * _this.blinkMaxRandomCounter;
      _this.blinking = true;
    }

    if (_this.blinking && _this.blinkLengthCounter > 0) {
      _this.blinkLengthCounter -= _this.blinkCounterStep;
    } else {
      _this.blinkLengthCounter = _this.blinkLength;
      _this.blinking = false;
    }
  }

  _this.draw = function() {
    ctx.save();

    ctx.translate((canvas.width / 2) - _this.pos / 1.5, canvas.height / 2);

    //Background
    ctx.beginPath();
    ctx.arc(0 + (Math.abs(_this.pos) / 90), 0 + (Math.abs(_this.pos) / 90), _this.radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = '#F4A295';
    ctx.fill();

    //Moon
    ctx.beginPath();
    ctx.arc(0, 0, _this.radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    var grd = ctx.createRadialGradient(0, 0, 0, 0, 0, _this.radius);
    grd.addColorStop(0, "#F0E86D");
    grd.addColorStop(0.2, "#F0E84D");
    grd.addColorStop(0.8, "#F0E84D");
    grd.addColorStop(1, "#F0E86D");
    ctx.fillStyle = grd;
    ctx.fill();

    //Crater 1, 2, 3
    ctx.fillStyle = '#EFEB9B';
    ctx.rotate(_this.craterDegrees);
    ctx.beginPath();
    ctx.arc(-_this.radius * 0.4, 0, _this.radius * 0.45, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(-_this.radius * 0.1, -_this.radius * 0.6, _this.radius * 0.25, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(_this.radius * 0.1, -_this.radius * 0.1, _this.radius * 0.15, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.rotate(-_this.craterDegrees);

    //Mouth
    ctx.rotate(Math.PI / 2 - _this.mouthLength / 2);
    ctx.strokeStyle = '#FFF';
    ctx.lineWidth = _this.radius * 0.1;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(0, 0, _this.radius * 0.8, 0, _this.mouthLength, false);
    ctx.stroke();
    ctx.rotate(-(Math.PI / 2 - _this.mouthLength / 2));

    //Eyelashes
    if (_this.gender === 'girl') {
      ctx.strokeStyle = '#745836';
      ctx.lineWidth = _this.radius * 0.02;
      ctx.beginPath();
      ctx.moveTo(-_this.radius * 0.5, -_this.radius * 0.07);
      ctx.lineTo(-_this.radius * 0.65, -_this.radius * 0.11);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-_this.radius * 0.48, -_this.radius * 0.11);
      ctx.lineTo(-_this.radius * 0.63, -_this.radius * 0.15);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(_this.radius * 0.5, -_this.radius * 0.07);
      ctx.lineTo(_this.radius * 0.65, -_this.radius * 0.11);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(_this.radius * 0.48, -_this.radius * 0.11);
      ctx.lineTo(_this.radius * 0.63, -_this.radius * 0.15);
      ctx.stroke();
    }

    //Pupils
    if (!_this.blinking) {
      ctx.fillStyle = _this.gender === 'girl' ? '#745836' : '#5CA595';
      ctx.beginPath();
      ctx.arc(-_this.radius * 0.35, -_this.radius * 0.1, _this.radius * 0.16, 0, Math.PI * 1.8, false);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(_this.radius * 0.35, -_this.radius * 0.1, _this.radius * 0.16, 0, Math.PI * 1.8, false);
      ctx.fill();
      ctx.fillStyle = '#FFF';
      if (_this.look === 'right') {
        ctx.beginPath();
        ctx.arc(-_this.radius * 0.3, -_this.radius * 0.14, _this.radius * 0.03, 0, Math.PI * 1.8, false);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(_this.radius * 0.4, -_this.radius * 0.14, _this.radius * 0.03, 0, Math.PI * 1.8, false);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(-_this.radius * 0.42, -_this.radius * 0.14, _this.radius * 0.03, 0, Math.PI * 1.8, false);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(_this.radius * 0.3, -_this.radius * 0.14, _this.radius * 0.03, 0, Math.PI * 1.8, false);
        ctx.fill();
      }
    } else {
      ctx.strokeStyle = _this.gender === 'girl' ? '#745836' : '#5CA595';
      ctx.lineWidth = _this.radius * 0.1;
      ctx.beginPath();
      ctx.moveTo(_this.radius * 0.5, -_this.radius * 0.1);
      ctx.lineTo(_this.radius * 0.15, -_this.radius * 0.1);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-_this.radius * 0.15, -_this.radius * 0.1);
      ctx.lineTo(-_this.radius * 0.50, -_this.radius * 0.1);
      ctx.stroke();
    }

    //Beauty mark
    if (_this.gender === 'girl') {
      ctx.fillStyle = '#2E261C';
      ctx.beginPath();
      ctx.arc(_this.radius * 0.4, _this.radius * 0.4, _this.radius * 0.01, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  function calculateMouthLength() {
    var spaseShipPos = spaceship.getSpaceShipPosition();
    var distance = twoPointDistance(_this.pos + canvas.width / 2, canvas.height / 2, spaseShipPos.x, spaseShipPos.y);
    var percentage = (distance * 100) / unit / 2;
    percentage = percentage > 60 ? percentage : 60;
    _this.mouthLength = (percentage * Math.PI) / 100;
  }
}

function SmokeBubble(xPos, yPos, degrees) {
  var _this = this;

  //Constructor
  (function() {
    initialise();
  })();

  _this.toDelete = function() {
    return _this.opacity < 0 ? true : false;
  }

  _this.update = function() {
    _this.opacity -= _this.opacitySpeed;
    _this.size += _this.sizeSpeed;
  }

  _this.draw = function() {
    ctx.save();

    ctx.translate((canvas.width / 2) + _this.x + (_this.radius / 2), (canvas.height / 2) + _this.y);
    ctx.rotate(_this.degrees);
    ctx.beginPath();
    ctx.arc(-_this.radius * 4.2, 0, _this.size, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,' + _this.opacity + ')';
    ctx.fill();

    ctx.restore();
  }

  function initialise() {
    _this.x = xPos;
    _this.y = yPos;
    _this.degrees = degrees;
    _this.radius = unit / 30;
    _this.size = (unit / 30) * 0.6;
    _this.sizeSpeed = unit / 500;
    _this.opacity = 0.8;
    _this.opacitySpeed = 0.04;
  }
}

//AUX functions

function getMousePos(canvas, evt) {
  // necessary to take into account CSS boudaries
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  }
}

function lemniscate(a, t) {
  var lemniscateObj = {
    x: (a * Math.cos(t)) / (1 + (Math.sin(t) * Math.sin(t))),
    y: (a * Math.sin(t) * Math.cos(t)) / (1 + (Math.sin(t) * Math.sin(t)))
  }
  return lemniscateObj;
}

function twoPointDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(((x2 - x1)), 2) + Math.pow(((y2 - y1)), 2));
}

function calculateUnit() {
  var maxLength = Math.min(canvas.width, canvas.height);
  return maxLength / 2.5;
}
