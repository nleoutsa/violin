'use strict';

var arrowCodes = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    32: "space",
    16: "shift",
    80: "p"
};

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
    "                                      ",
    "                                      ",
    "                                      ",
    "                                      ",
    "                                      ",
    "                                      ",
    "                                      ",
    "                                      ",
    "                               o      ",
    "            ooo                 o     ",
    "                                 o    ",
    "                         xox      o   ",
    "           ooo       o    x        o  ",
    "           ooo      xxx            o  ",
    "           ooo            o         o ",
    "          xxxxx   o      xxx        o ",
    "    @             o                 o ",
    "   xxxxx          o  xxx            o ",
    "                    oooooo      TT    ",
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx===",
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
    "    x           xxxx xxxxxxxx x     xxxxxxxxxxooxxxxxxxxxx    o          ",
    "    x           xxxx xxxxxxxx x=====xxxxxxxxxxooxxxxxxxxxx      o        ",
    "    x           xxxx xxxxxxx  xxxxxxxxxxxxxxxxooxxxxxxxxxx       o       ",
    "    x           xxxx xxxxxx   xxxxxxxxxxxxxxxxooxxxxxxxxxx        o      ",
    "    x      TT   xxxxT                  xxxxxxxooxxxxxxxxxx         o     ",
    "           xx   xxxxxxxxxxxxx          xxxxxxxooxxxxxxxxxx          o    ",
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

var level_05 = [
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
var GAME_LEVELS = [level_00, level_01, level_02, level_03, level_04, level_05];

var actorChars = {
    "@": Player,
    "o": Coin,
    "T": Trampoline,
    "=": Lava, "|": Lava, "v": Lava
};

var SCALE_HEIGHT = 1;
var SCALE_WIDTH = 1;



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
var maxStep = 0.05;

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




