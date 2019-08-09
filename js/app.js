/*
In this game you have a Player and Enemies (Bugs). The goal of the player is to reach the water, without colliding into any one of the enemies. The player can move left, right, up and down. The enemies move in varying speeds on the paved block portion of the scene. Once a the player collides with an enemy, the game is reset and the player moves back to the start square. Once the player reaches the water the game is won.

*/

// Character superclass
var Character = function(sprite, location, speed) {
    this.sprite = sprite;
    this.x      = location.x;
    this.y      = location.y;
    this.speed  = speed;
}
// Draw the character on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
Inside the app.js file, you will need to implement the Player and the Enemy classes, using Object-Oriented JavaScript. Part of the code for the Enemy is provided to you, and you will need to complete the following:
    + The Enemy function, which initiates the Enemy by:
        - Loading the image by setting this.sprite to the appropriate image in the image folder (already provided)
        - Setting the Enemy initial location (you need to implement)
        - Setting the Enemy speed (you need to implement)
    + The update method for the Enemy
        - Updates the Enemy location (you need to implement)
        - Handles collision with the Player (you need to implement)
    + You can add your own Enemy methods as needed

You will also need to implement the Player class, and you can use the Enemy class as an example on how to get started. At minimum you should implement the following:
    + The Player function, which initiates the Player by:
        - Loading the image by setting this.sprite to the appropriate image in the image folder (use the code from the Enemy function as an example on how to do that)
        - Setting the Player initial location 
    + The update method for the Player (can be similar to the one for the Enemy)
    + The render method for the Player (use the code from the render method for the Enemy)
    + The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input. In particular:
        - Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.
        - Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).
        - If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).
    + You can add your own Player methods as needed.

Once you have completed implementing the Player and Enemy, you should instantiate them by:
    + Creating a new Player object
    + Creating several new Enemies objects and placing them in an array called allEnemies
*/


// Enemies our player must avoid
var Enemy = function(location, speed, direction) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Character.call(this, 'images/enemy-bug.png', location, speed);
    this.direction = direction;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x += this.speed * dt * this.direction;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    /* (200,200) is the center of the board */
    Character.call(this, 'images/char-boy.png', {x:200, y:400}, 10); /* TODO : select character... */
}
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
    
}
Player.prototype.handleInput = function(keyCode) {
    console.log(keyCode);
    switch(keyCode) {
      case 'left':
        this.x -= this.speed; /* use max() & min(); > 0 & < engine.canvas.x */
        break;
      case 'up':
        this.y -= this.speed;
        break;
      case 'right':
        this.x += this.speed;
        break;
      case 'down':
        this.y += this.speed;
        break;
      default:
        console.log('input not recognized');
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [
    new Enemy({x:0, y:60}, 20, 1),
    new Enemy({x:400, y:145}, 20, -1),
    new Enemy({x:150, y:230}, 20, 1)
];
player = new Player();


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
