// Enemies our player must avoid
function Enemy(masterGame,line = 1,sprite = 'images/enemy-bug.png')
{
    this.speed = 0;
    this.x = -100;
    this.y = line;
    this.start = -100;
    this.end = 500;
    this.startMoving = false;
    this.game = masterGame;
    this.sprite = sprite;
    //Delay to be able to move
    this.waitToMove();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt)
{
    //onlymove if not resetting or redrawing player after win or collide
    this.x += this.startMoving && !this.game.resetting? this.speed * 40 * dt : 0;
    if (this.x > this.end) this.waitToMove();
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, game.enemyLines[this.y]);
};
//Pause moving for win or collide
Enemy.prototype.waitToMove = function()
{
    this.startMoving = false;
    this.x = this.start;
    let random = Math.floor((Math.random() * 1000) + 300);
    setTimeout(() =>
        {
            this.getSpeed();
            this.startMoving = true;
        },
        random);
};
//Adjust the speed
Enemy.prototype.getSpeed = function()
{
    this.speed = Math.floor(Math.random() * (this.game.level+4) + Math.ceil(this.game.level/2));
};