
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.yRange = [60, 145, 230];
    this.x = -100;
    this.y = this.yRange[Math.floor((Math.random() * 3) + 0)];

    this.speed = Math.floor((Math.random() * 100) + 50);
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
    if (this.x > 500) {
        this.x = -100;
    }    
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    
    this.x = 200;
    this.y = 382.5;
    this.sprite = 'images/char-boy.png';
}
 
Player.prototype.update = function () {
    if (this.y < 0) {
        this.reset();
        gem.reset();
    }

    for (i in allEnemies){
        if (Math.abs(this.x - allEnemies[i].x) < 50 & Math.abs(this.y-allEnemies[i].y) < 50){
            this.reset();
            gem.reset();
        }
    }
}

Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys === "up") {
        this.y = this.y - 85;
    };
    if (allowedKeys === "down" & this.y < 382.5) {
        this.y = this.y + 85;
    };
    if (allowedKeys === "left" & this.x > 0) {
        this.x = this.x - 100;
    };
    if (allowedKeys === "right" & this.x < 400) {
        this.x = this.x + 100;
    };
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 382.5;
}




var Gem = function () {
    this.xRange = [0, 100, 200, 300, 400];
    this.yRange = [60, 140, 230];
    this.x = this.xRange[Math.floor((Math.random() * 5) + 0)];
    this.y = this.yRange[Math.floor((Math.random() * 3) + 0)];
    this.sprite = 'images/Gem Blue.png';
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}



Gem.prototype.update = function() {
    if (Math.abs(this.x - player.x) < 50 & Math.abs(this.y-player.y) < 50){
        this.remove();
    }  
}

Gem.prototype.remove = function() {
    this.x = -100;
    this.y = -100;
}

Gem.prototype.reset = function() {
    this.xRange = [0, 100, 200, 300, 400];
    this.yRange = [60, 140, 230];
    this.x = this.xRange[Math.floor((Math.random() * 5) + 0)];
    this.y = this.yRange[Math.floor((Math.random() * 3) + 0)];
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var gem = new Gem();

var allEnemies = [];
for (i = 0; i < 4; i++) {
    allEnemies.push(new Enemy());
};


var player = new Player();






// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
