'use strict';


var arrows = trackKeys(arrowCodes);
var LIVES = 3;
var lives = LIVES;
var coins = 0;

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
            console.log(paused);
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
                    console.log(Display);
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
                console.log(Display);
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










