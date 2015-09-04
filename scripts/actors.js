'use strict';

// vars
var gravity = 30;
var wobble_speed = 8;
var wobble_dist = 0.07;
var JUMP_SPEED = 14;



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
    this.pos = pos;
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




