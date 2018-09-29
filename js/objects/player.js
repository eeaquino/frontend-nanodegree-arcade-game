//Player Constructor
function Player(masterGame, avatar = "images/char-boy.png")
{
    this.avatar = avatar;
    this.x = 3;
    this.y = 6;
    this.game = masterGame;
}
//Change theavatar image
Player.prototype.changeAvatar = function(avatar)
{
    this.avatar = avatar;
    this.render();
};
//handel keyboard input
Player.prototype.handleInput = function(key)
{
    if (this.game.levelingUp || this.game.resetting) return;
    switch (key) {
        case 'left':
            this.x -= this.x - 1 > 0 ? 1 : 0;
            break;
        case 'right':
            this.x += this.x < this.game.maxColumn ? 1 : 0;
            break;
        case 'up':
            this.y -= this.y - 1 > 0 ? 1 : 0;
            this.checkWin();
            break;
        case 'down':
            this.y += this.y < this.game.maxLine ? 1 : 0;
            break;
    }
};
//check for collision on tick
Player.prototype.update = function()
{
    this.game.checkCollision();
};
//check if player won after move
Player.prototype.checkWin = function()
{
    if (this.y === 1) {
        this.game.increaseLevel();
    }
};
//reset player position to starting point
Player.prototype.reset = function()
{
    this.x = 3;
    this.y = 6;
};
//Draw player
Player.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.avatar), this.game.playerColumns[this.x], this.game.playerLines[this.y]);
};