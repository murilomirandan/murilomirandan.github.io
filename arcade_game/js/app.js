// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  constructor(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt){
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if(this.x > 510){
      this.x = -50;
      this.speed = 100 + Math.floor(Math.random() * modes[2]) + Math.floor(Math.random() * level * 2);
    }

    // Check for collision between player and enemy
    if(player.x < this.x + 60 && player.x + 60 > this.x &&
       player.y < this.y + 60 && player.y + 60 > this.y){
         player.x = 202;
         player.y = 405;
       }
  }

  // Draw the enemy on the screen, required method for game
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.sprite = 'images/char-boy.png';
  }

  update(){
    if(this.x > 402)
      this.x = 402;

    if(this.x < -2)
      this.x = -2;

    if(this.y > 404)
      this.y = 404;

    if(this.y < -2)
      this.y = -2;
  }

  // Draw the character on the screen, required method for game
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(direction){
    switch(direction){
      case 'left':
        this.update(this.x -= 101);
        break;
      case 'up':
        this.update(this.y -= 83);
        break;
      case 'right':
        this.update(this.x += 101);
        break;
      case 'down':
        this.update(this.y +=83);
    }
    if(this.y < 0){
      setTimeout(function(){
        player.x = 202;
        player.y = 405;
      }, 100);
      level += 1;
    }
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
const enemyLocation = [60, 145, 230];

// difficulty modes
const modes = [50, 100, 200, 300, 350];
// level of the game
let level = 1;

enemyLocation.forEach(function (locY){
  enemy = new Enemy(0, locY, 100 + Math.floor(Math.random() * modes[2]));
  allEnemies.push(enemy);
});

// Place the player object in a variable called player
const player = new Player(202, 405);


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
