'use strict';

// vars

var maxStep = 0.05;

var gravity = 30;
var wobble_speed = 8;
var wobble_dist = 0.07;
var JUMP_SPEED = 14;

var scale = 25;
var daytime = true;
var sun_size = 3;
var count = 0;
var sun_height = 0;
var sun_pos = new Vector (-3, 3);


var arrowCodes = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    32: "space",
    16: "shift",
    80: "p"
};

var arrows = trackKeys(arrowCodes);
var LIVES = 3;
var lives = LIVES;
var coins = 0;


var level_00 = [
    "                        ",
    "                        ",
    "                        ",
    "                        ",
    "                        ",
    "      @                 ",
    "  x   x x     x x       ",
    "  x   x   xxx x   xxx   ",
    "   x x  x x x x x x x   ",
    "    x   x xxx x x x x x ",
    "                        ",
    "                        ",
    "                        ",
    "                        ",
    "                        ",
    "                        ",
    "                        ",
    "                        ",
    "                        ",
    "       T       ooo      ",
    "xxxxxxxxxx===xxxxxxxxxxx",
    "xxxxxxxxxxxxxxxxxxxxxxxx"

];

var level_01 = [
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "     o                    ",
    "    o                     ",
    "   o                      ",
    "  o                       ",
    " o                        ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "           o            ",
    "          o   T           ",
    "         o   xxx          ",
    "        o                 ",
    "        o                 ",
    "       o                  ",
    "       o                  ",
    "      o                   ",
    "      o                   ",
    "      o                   ",
    "      o                   ",
    "      o                   ",
    "      T                   ",
    "     xxx           o      ",
    "                   o      ",
    "                   o      ",
    "                   o      ",
    "                   o      ",
    "                   o      ",
    "                   o      ",
    "                   o      ",
    "                   o      ",
    "                   o      ",
    "                   T      ",
    "                  xxx     ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "      T                   ",
    "     xxx                  ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                   T      ",
    "                  xxx     ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "                          ",
    "         TT               ",
    "        xxxx              ",
    "                          ",
    "                          ",
    "                          ",
    "     @                    ",
    "                          ",
    "                          ",
    "                          ",
    "    TTT                   ",
    "   xxxxx                  ",
    "                          ",
    "xxxxxxxxxxxxxxxxxxxxxxxxxx",
    "xxxxxxxxxxxxxxxxxxxxxxxxxx"

];

var level_02 = [
    "v v v v v v v                        o",
    " v v v v v v                         o",
    "                                     o",
    "                                     o",
    "                                     o",
    "         xxxxxx                      o",
    "        x      x                     o",
    "                                     o",
    "          oooo     @                 o",
    "       xxxxxxxxxxxxxxxxxxxxxxxx    o T",
    "       xxxxxxxxxxxx xxxxxxxxxxx   o   ",
    "       xxxxxxxxxxxx xxxxxxxxxxx  o    ",
    "       xxxxxxxxxxxxoxxxxxxxxxxx o     ",
    "       xxxxxxxxxxxx xxxxxxxxxxxo      ",
    "       xxxxxxxxxxxx xxxxxxxxxxxT o    ",
    "       xxxxxxxxxxxx xxxxxxxxxxx   o   ",
    "       xxxxxxxxxxxx xxxxxxxxxxx    o  ",
    "       xxxxxxxxxxxx xxxxxxxxxxx     o ",
    "       xxxxxxxxxxxx xxxxxxxxxxx      o",
    "       xxxxxxxxxxxxTxxxxxxxxxxx    o T",
    "       xxxxxxxxxxxx xxxxxxxxxxx   o   ",
    "       xxxxxxxxxxxx xxxxxxxxxxx  o    ",
    "       xxxxxxxxxxxx xxxxxxxxxxx o     ",
    "       xxxxxxxxxxxx xxxxxxxxxxxo      ",
    "       xxxxxxxxxxxx xxxxxxxxxxxT o    ",
    "      xxxxxxxxxxxxx xxxxxxxxxxx   o   ",
    "     x    ooooooo xTxxxxxxxxxxx    o  ",
    "        xxxxxxxxxxx xxxxxxxxxxx     o ",
    "       xxxxxxxxxxxx xxxxxxxxxxx      o",
    "       xxxxxxxxxxxx xxxxxxxxxxx    o T",
    "       xxxxxxxxxxxx xxxxxxxxxxx   o   ",
    "       xxxxxxxxxxxx xxxxxxxxxxx  o    ",
    "T      xxxxxxxxxxxx xxxxxxxxxxx o     ",
    "       xxxxxxxxxxxxTxxxxxxxxxxxo      ",
    "       xxxxxxxxxxxx xxxxxxxxxxxT o    ",
    "       xxxxxxxxxxxx xxxxxxxxxxx   o   ",
    "       xxxxxxxxxxxx xxxxxxxxxxx    o  ",
    "       xxxxxxxxxxxx xxxxxxxxxxx     o ",
    "       xxxxxxxxxxxx xxxxxxxxxxx      o",
    "      Txxxxxxxxxxxx xxxxxxxxxxx    o T",
    "       xxxxxxxxxxxxTxxxxxxxxxxx   o   ",
    "       xxxxxxxxxxxx xxxxxxxxxxx  o    ",
    "       xxxxxxxxxxxx xxxxxxxxxxx o     ",
    "       xxxxxxxxxxxx xxxxxxxxxxxo      ",
    "       xxxxxxxxxxxx xxxxxxxxxxxT o    ",
    "       xxxxxxxxxxxx xxxxxxxxxxx   o   ",
    "T      xxxxxxxxxxxxTxxxxxxxxxxx    o  ",
    "x      xxxxxxxxxxxx xxxxxxxxxxx     o ",
    "xx     xxxxxxxxxxxx xxxxxxxxxxx      o",
    "xxx                                  T",
    "xxxx                                  ",
    "xxxxx                                 ",
    "xxxxxx      x     TTT                 ",
    "xxxxxxx===========xxx==========xxxx===",
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

];

var level_03 = [
    "    x                                                                    ",
    "    x                                                                    ",
    "    x                                                                    ",
    "  @ x                             x xx x                                 ",
    " xxxx                            xx xx xxx                               ",
    "    x                          xxxx xx xxxxx                             ",
    "    x                        xxxxxx xxoxxxxxxx                           ",
    "    x                     xxxxxxxxx xxoxxxxxxxxxx                        ",
    "    x                  xxxxxxxxxxxx xxoxxxxxxxxxxxxx                     ",
    "    x              xxxxxx           xxoxxxxxxxxxxxxxxxxx                 ",
    "    x                      xxxxxxxxxxxoxxxxxxxx                          ",
    "    x        xxx           xxxxxxxxxxxoxxxxxxxx                          ",
    "    x                      xxooooooooooxxxxxxxx                          ",
    "    x                      xxoxxxxxxxxxxxxxxxxx                          ",
    "    x                      xxoxxxxxxxxxxxxxxxxx                          ",
    "    x                      xxoxxxxxxxxxxxxxxxxx                          ",
    "    x                      xxoxxxxxxxxxxxxooo                            ",
    "    xTT                    xxoxxxxxxxxxxxxoxxxx                          ",
    "    xxx                    xxoxxxxxxxxxxxxoxxxx                          ",
    "    x        xxx      xxxxxxxoxx      xxxxoxxxxxxxxx                     ",
    "    x                xxxxxxxxoxxx xxooxxxxoxxxxxxxxxx                    ",
    "    x               xxxxxxxxxoxxx xxooxxxxoxxxxxxxxxxx                   ",
    "    x              xxxxxxxxxxoxxx xxooxxxxoxxxxxxxxxxxx                  ",
    "    x             xxxxxxxxxxxoxxx xxooxxxxoxxxxxxxxxxxxx                 ",
    "    x            xxxxxxxxxxxxoxxx xxooxxxxooooooooxxxxxxx                ",
    "    x                xxxxxxxxoxxx xxooxxxxxxxxxxxoxxxxxxxx               ",
    "    x           xxxx xxxxxxxxoxxx xxooxxxxxxxxxxxoxxxxxxxx               ",
    "    x           xxxx xxxxxxxx xxx xxooooooooooooxoooooooooo              ",
    "    x           xxxx xxxxxxxx xxx xxxxxxxxxxxxooxxxxxxxxxx  o            ",
    "    x           xxxx xxxxxxxx xxx xxxxxxxxxxxxooxxxxxxxxxx    o          ",
    "    x           xxxx xxxxxxxx xxx xxxxxxxxxxxxooxxxxxxxxxx      o        ",
    "    x           xxxx xxxxxxx   xx xxxxxxxxxxxxooxxxxxxxxxx       o       ",
    "    x           xxxx xxxxxx     x xxxxxxxxxxxxooxxxxxxxxxx        o      ",
    "    x      TT   xxxxT                  xxxxxxxooxxxxxxxxxx         o     ",
    "           xx   xxxxxxxxxxxxx    x     xxxxxxxooxxxxxxxxxx          o    ",
    "                xxxxxxxxxxxxx==========xxxxxxxTT                    o    ",
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

];

var level_04 = [
    "                                                                         ",
    "                                                                         ",
    "                                                                         ",
    "                                                                         ",
    "                                                                         ",
    "   @            oooooooooooooooooooooooooooooooooooooooooooooooooooo     ",
    "  xxx           xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx     ",
    "    x          xx                                                        ",
    "    x         xxx o                                                      ",
    "    x        xxxxxxx                                                     ",
    "    x                                                                    ",
    "    x                                                                    ",
    "    x                                                                    ",
    "    x                                                                    ",
    "    x                                                                    ",
    "    x                                                                    ",
    "    x                                                                    ",
    "    x                                                                    ",
    "    x TTT                    TTTTTTTT            TTTTTTTT        TTTTTTTT",
    "    xxxxxx                   xxxxxxxx            xxxxxxxx        xxxxxxxx",
    "                                                                         ",
    "                                                                         ",
    "                                                                         ",
    "=========================================================================",
    "=========================================================================",
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

];






var GAME_LEVELS = [level_00, level_01, level_02, level_03];

var actorChars = {
    "@": Player,
    "o": Coin,
    "T": Trampoline,
    "=": Lava, "|": Lava, "v": Lava
};

var SCALE_HEIGHT = 1;
var SCALE_WIDTH = 1;



function Vector (x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function (vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
};

Vector.prototype.times = function (factor) {
    return new Vector(this.x * factor, this.y * factor);
};


function Level (plan) {

    this.width = plan[0].length;
    this.height = plan.length;

    this.grid = [];
    this.actors = [];

    for (var y = 0; y < this.height; y++) {
        var line = plan[y];
        var gridline = [];
        for (var x = 0; x < this.width; x++) {
            var char = line[x];
            // if no character, then it is 'air' and null is passed to the gridline...
            var fieldtype = null;

            // Actor holds Player, Coin, or Lava class...
            var Actor = actorChars[char];

            if (Actor) {
                // e.g.: new Actor() might actually mean new Player()
                var new_actor = new Actor(new Vector(x, y), char);
                this.actors.push(new_actor);
            }
            else if (char == "x")
                fieldtype = "wall";
            else if (char == "!")
                fieldtype = "lava";

            gridline.push(fieldtype);
        }
        this.grid.push(gridline);
    }


    this.player = this.actors.filter(function(actor) {
        return actor.type == 'player';
    })[0];

    this.status = this.finishDelay = null;
}

Level.prototype.isFinished = function() {
    return this.status != null && this.finishDelay < 0;
};


// collisions
Level.prototype.obstacleAt = function(pos, size) {
    var xStart = Math.floor(pos.x);
    var xEnd = Math.ceil(pos.x + size.x);
    var yStart = Math.floor(pos.y);
    var yEnd = Math.ceil(pos.y + size.y);

    if (xStart < 0 || xEnd > this.width || yStart < 0)
        return "wall";
    if (yStart > this.height)
        return "lava";
    for (var y = yStart; y < yEnd; y++) {
        for (var x = xStart; x < xEnd; x++) {
            var fieldtype = this.grid[y][x];
            if (fieldtype) return fieldtype;
        }
    }
};

Level.prototype.actorAt = function(actor) {
    for (var i = 0; i < this.actors.length; i++) {
        var other_actor = this.actors[i];
        if (other_actor != actor &&
            actor.pos.x + actor.size.x > other_actor.pos.x &&
            actor.pos.x < other_actor.pos.x + other_actor.size.x &&
            actor.pos.y + actor.size.y > other_actor.pos.y &&
            actor.pos.y < other_actor.pos.y + other_actor.size.y)
            return other_actor;
    }
};

Level.prototype.playerTouched = function(type, actor) {
    if (type == "lava" && this.status == null) {
        this.status = "lost";
        this.finishDelay = 2;
    }
    else if (type == "coin") {
        coins += 1;

        // remove actor
        this.actors = this.actors.filter(function(other) {
            return other != actor;
        });
        // if no coins left, set status to "won"
        if (!this.actors.some(function(actor) {return actor.type == "coin";})) {
            this.status = "won";
            this.finishDelay = 2;
        }
    }
    else if (type == "trampoline") {
        this.player.speed.y = -27;
    }
};

// animate
Level.prototype.animate = function(step, keys) {
    if (this.status != null)
        this.finishDelay -= step;

    while (step > 0) {
        var this_step = Math.min(step, maxStep);
        this.actors.forEach(function(actor) {
            actor.act(this_step, this, keys);
        }, this);
        step -= this_step;
    }
};






function Player (pos) {
    this.pos = pos.plus(new Vector(0, -0.5));
    this.size = new Vector(0.8, 1.5);
    this.speed = new Vector(0, 0);
    this.jump_speed = JUMP_SPEED;
    this.player_x_speed = 7;

}
Player.prototype.type = "player";
Player.prototype.moveX = function(step, level, keys) {
    this.speed.x = 0;

    if (keys.left)
        this.speed.x -= this.player_x_speed;
    if (keys.right)
        this.speed.x += this.player_x_speed;

    var motion = new Vector(this.speed.x * step, 0);
    var new_pos = this.pos.plus(motion);
    var obstacle = level.obstacleAt(new_pos, this.size);
    if (obstacle)
        level.playerTouched(obstacle);
    else
        this.pos = new_pos;
};
Player.prototype.moveY = function(step, level, keys) {
    this.speed.y += step * gravity;
    var motion = new Vector(0, this.speed.y * step);
    var new_pos = this.pos.plus(motion);
    var obstacle = level.obstacleAt(new_pos, this.size);


    if (obstacle) {
        level.playerTouched(obstacle);
        if ((keys.space || keys.up) && this.speed.y > 0) {
            this.speed.y = -this.jump_speed;
            this.air_jump = false;
        }
        else
            this.speed.y = 0;
    }
    else {
        this.pos = new_pos;
    }
};

// var ducking = false;
Player.prototype.duck = function(step, level, keys) {
    if (keys.down) {
        if (this.size.y > 0.75) {
            this.size.y -= 0.07;
            this.pos.y += 0.07;
        }
    }
    else if (this.size.y < 1.5) {
        var new_size = this.size.plus(new Vector(0, 0.07));
        var new_pos = this.pos.plus(new Vector(0, -0.07));
        var obstacle = level.obstacleAt(new_pos, new_size);
        // dont grow up into obstacles...
        if (obstacle)
            level.playerTouched(obstacle);
        // wait til there are none then continue growing to full size
        else if (!obstacle) {
            this.pos = new_pos;
            this.size = new_size;
        }
    }
}
Player.prototype.superPowers = function(step, level, keys) {
    if (keys.shift) {
        this.player_x_speed = 15;
        this.jump_speed = 20;
    }
    else {
        this.player_x_speed = 7;
        this.jump_speed = JUMP_SPEED;
    }
}
Player.prototype.act = function(step, level, keys) {
    this.moveX(step, level, keys);
    this.moveY(step, level, keys);
    this.duck(step, level, keys);
    this.superPowers(step, level, keys);

    var other_actor = level.actorAt(this);
    if (other_actor)
        level.playerTouched(other_actor.type, other_actor);

};






function Lava (pos, char) {
    this.base_pos = this.pos = pos;
    this.size = new Vector(1, 1);

    if (char == "=") {
        this.base_pos = this.pos = pos.plus(new Vector(0, 0));
        this.wobble = Math.random() * Math.PI * 2;
        this.speed = new Vector(0, 0);
    }
    else if (char == "|")
        this.speed = new Vector(0, 2);
    else if (char == "v") {
        this.speed = new Vector(0, 3);
        this.return_pos = pos;
    }
}
Lava.prototype.type = "lava";
Lava.prototype.act = function(step, level) {
    var new_pos = this.pos.plus(this.speed.times(step));
    if (!level.obstacleAt(new_pos, this.size))
        this.pos = new_pos;
    else if (this.return_pos)
        this.pos = this.return_pos;
    else
        this.speed = this.speed.times(-1);

    this.wobble += step * wobble_speed * Math.random();
    var wobble_pos = Math.sin(this.wobble) * wobble_dist;
    this.pos = this.base_pos.plus(new Vector(0, wobble_pos));
};







function Coin (pos) {
    this.base_pos = this.pos = pos.plus(new Vector(0.2, 0.1));
    this.wobble = Math.random() * Math.PI * 2;
    this.size = new Vector(0.6, 0.6);
}
Coin.prototype.type = "coin";
Coin.prototype.act = function(step) {
    this.wobble += step * wobble_speed;
    var wobble_pos = Math.sin(this.wobble) * wobble_dist;
    this.pos = this.base_pos.plus(new Vector(0, wobble_pos));
};








function Trampoline (pos) {
    this.pos = pos.plus(new Vector(0, 0.8));
    this.size = new Vector(1, 0.2);
}
Trampoline.prototype.type = "trampoline";
Trampoline.prototype.act = function(step, level) {
};




function DOMDisplay(parent, level) {
    this.daylight = parent.appendChild(elt('div', 'daylight'));
    this.container = parent.appendChild(elt('div', 'game'));
    this.level = level;

    this.container.appendChild(this.drawBackground());
    this.actorLayer = null;
    this.drawFrame();
}

DOMDisplay.prototype.drawBackground = function() {
    var table = elt('table', 'background');
    table.style.width = (this.level.width * scale) + 'px';
    this.level.grid.forEach(function(row) {
        var rowElt = table.appendChild(elt('tr'));
        rowElt.style.height = scale + 'px';
        row.forEach(function(type) {
            rowElt.appendChild(elt('td', type));
        });
    });
    return table;
};


DOMDisplay.prototype.drawActors = function() {
    var container = elt('div', 'actor_container');


    // sun/moon progression through sky
    var sun = container.appendChild(elt('div', 'sun'));

    var sun_progress = (sun_pos.x * scale) / (this.level.width * scale);
    var atmosphere_brightness = Math.sin((Math.PI) * (sun_progress));

    if (daytime) {
        this.daylight.style.background = 'rgba(0,0,0,' + (1 - atmosphere_brightness) + ')';
        sun.style.background = 'rgba( 255, ' + (220 + Math.floor(30 * atmosphere_brightness)) + ', 200, 1)';
        sun_size = 3;
    }
    if (!daytime) {
        sun.style.backgroundImage = 'url(images/moon.ico)';
        sun.style.backgroundSize = '130%';
        sun.style.backgroundPosition = '50% 50%';
        sun_size = 2.5;
    }


    if (Math.floor(sun_progress)%2 == 1) {
        daytime = !daytime;
        sun_pos = new Vector(-3, 3);
    }
    sun_height = -0.3 * Math.sin(2 * Math.PI * sun_progress) / 60;
    sun_pos = sun_pos.plus(new Vector (0.02, sun_height));

    sun.style.width = (sun_size * scale) + 'px';
    sun.style.height = (sun_size * scale) + 'px';
    sun.style.left = ((sun_pos.x - (sun_size / 2)) * scale) + 'px';
    sun.style.top = ((sun_pos.y) * scale) + 'px';

    this.level.actors.forEach(function(actor) {
        var rect = container.appendChild(elt('div', 'actor ' + actor.type));
        rect.style.width = (actor.size.x * scale) + 'px';
        rect.style.height = (actor.size.y * scale) + 'px';
        rect.style.left = (actor.pos.x * scale) + 'px';
        rect.style.top = (actor.pos.y * scale) + 'px';



        // player shadow
        if (actor.type == 'player') {

            var height_above_bottom;
            // shadow angle based on sun position and player position vector difference
            var x_offset = (actor.pos.x - sun_pos.x) / scale;
            var y_offset = (actor.pos.y - sun_pos.y) / scale;

            height_above_bottom = (this.container.clientHeight + actor.pos.y) * 2;
            // skew based on speed
            var skew_amount = actor.speed.x;
            setVendor(rect, 'Transform', 'skew(' + -skew_amount + 'deg)');

            drawShadow(rect, x_offset, y_offset, height_above_bottom, 0.03);

            if (this.level.status == 'lost') {
                count += (1/120);
                actor.pos.y -= 0.1;
                this.container.style.opacity = 1 - count + "";
            }
            else if (this.level.status == 'won') {
                count += (1/120);
                this.container.style.opacity = 1 - count + "";
            }
        }

    }, this);
    return container;
};


DOMDisplay.prototype.drawFrame = function() {
    // remove last frame...
    if (this.actorLayer)
        this.container.removeChild(this.actorLayer);

    this.actorLayer = this.container.appendChild(this.drawActors());
    this.container.className = 'game' + (this.level.isFinished() || ' ');
    this.scrollPlayerIntoView();
    this.stats();
};

DOMDisplay.prototype.scrollPlayerIntoView = function() {
    var width = this.container.clientWidth;
    var height = this.container.clientHeight;
    var margin = width / 3;

    var left = this.container.scrollLeft;
    var right = left + width;
    var top = this.container.scrollTop;
    var bottom = top + height;

    var player = this.level.player;
    var center = player.pos.plus(player.size.times(0.5)).times(scale);

    // scroll if player goes too far to any edge
    if (center.x < left + margin)
        this.container.scrollLeft = center.x - margin;
    else if (center.x > right - margin) {
        this.container.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin)
        this.container.scrollTop = center.y - margin;
    else if (center.y > bottom - margin)
        this.container.scrollTop = center.y + margin - height;
};

DOMDisplay.prototype.clear = function() {
    count = 0;
    this.container.parentNode.removeChild(this.container);
};

DOMDisplay.prototype.stats = function() {
    var lives_left = document.getElementById('lives');
    lives_left.innerHTML = lives;

    var coins_collected = document.getElementById('coins_collected');
    coins_collected.innerHTML = coins;
}



// create element of type 'name' with class 'className'
function elt(name, className) {
    var elt = document.createElement(name);
    if (className) elt.className = className;
    return elt;
}

function setVendor(element, property, value) {
  element.style["webkit" + property] = value;
  element.style["moz" + property] = value;
  element.style["ms" + property] = value;
  element.style["o" + property] = value;
}

function drawShadow(element, x_offset, y_offset, shadow_length, shadow_alpha) {
  var box_shadow = '';

  for (var i = 0; i < shadow_length; i++) {
    box_shadow += (i * x_offset)+'px ' + (i * y_offset)+'px ' + 0 +'px rgba(0,0,0,' + shadow_alpha + '), ';
  }

  element.style.boxShadow = box_shadow;
}


function trackKeys(codes) {
    var pressed = Object.create(null);
    function handler (event) {
        if (codes.hasOwnProperty(event.keyCode)) {
            var down = event.type == "keydown";
            pressed[codes[event.keyCode]] = down;
            event.preventDefault();
        }
    }
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);
    return pressed;
}

function runAnimation(frameFunction) {
    var last_time = null;

    function frame(time) {
        var stop = false;
        if (last_time != null) {
            var time_step = Math.min(time - last_time, 100) / 1000;
            stop = frameFunction(time_step) === false;
        }
        last_time = time;
        if (!stop)
            requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}


function runLevel(level, Display, andThen) {
    var game_container = document.getElementById("game_container");
    var display = new Display(game_container, level);
    var paused = false;

    function callAnimation(step) {
        level.animate(step, arrows);
        display.drawFrame(step);
        if (level.isFinished()) {
            display.clear();
            if (andThen)
                andThen(level.status);
            return false;
        }
    }

    runAnimation(function(step) {
        callAnimation(step);
        if (paused) {
            return false;
        }
    });

    document.body.addEventListener('keydown', function(event){
        if (event.keyCode == 80) {

            paused = !paused;
            runAnimation(function(step) {
                callAnimation(step);
                if (paused) {
                    return false;
                }
            });
        }
    });
}

function runGame(plans, Display) {


    function startLevel(n, lives_left) {
        runLevel(new Level(plans[n]), Display, function(status) {
            if (status == "lost") {
                count = 0;
                lives -= 1;

                if (lives <= 0) {
                    lives = LIVES;
                    coins = 0;
                    startLevel(0, LIVES);
                }
                else
                    startLevel(n, lives);
            }
            else if (n < plans.length - 1) {
                startLevel(n + 1, lives);
            }
            else if (n >= plans.length) {
                startLevel(0, LIVES);
            }
            else {
                lives = LIVES;
                startLevel(0, LIVES);
            }

        });
    }
    startLevel(0, LIVES);
}



// detect browser type and version (thanks to http://stackoverflow.com/users/80860/kennebec)
navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    // return M.join(' ');
    return M[0];
})();

if (navigator.sayswho != 'Chrome') {
    // tell user to use latest version of chrome.
    var game_container = document.getElementById("game_container");
    document.body.removeChild(game_container);

    var chrome_alert = elt("div", "chrome_alert");
    chrome_alert.style.display = 'block';
    chrome_alert.style.textAlign = 'center';
    chrome_alert.innerHTML = "Please use latest version of <strong>Google Chrome</strong> to play Violin."

    document.body.appendChild(chrome_alert)
}










runGame(GAME_LEVELS, DOMDisplay);