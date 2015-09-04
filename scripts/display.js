'use strict';

var scale = 25;
var daytime = true;
var sun_size = 3;
var count = 0;
var sun_height = 0;
var sun_pos = new Vector (-3, 3);


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

console.log(daytime);
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
    console.log('clear');
    this.container.parentNode.removeChild(this.container);
};

DOMDisplay.prototype.stats = function() {
    var lives_left = document.getElementById('lives');
    lives_left.innerHTML = lives;

    var coins_collected = document.getElementById('coins_collected');
    coins_collected.innerHTML = coins;
}


