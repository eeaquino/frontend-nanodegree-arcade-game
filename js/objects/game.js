//Game Constructor
function Game()
{
    this.levelElement = document.getElementById("level");
    this.scoreElement = document.getElementById("score");
    this.avatarElement = document.getElementById("avatar");
    this.allEnemies = [];
    this.avatars = ["images/char-boy.png", "images/char-cat-girl.png", "images/char-horn-girl.png", "images/char-pink-girl.png", "images/char-princess-girl.png"];
    this.score = 0;
    this.player = new Player(this);
    this.enemyLines = { 1: 60, 2: 140, 3: 230 };
    this.playerLines = { 1: -10, 2: 70, 3: 150, 4: 240, 5: 320, 6: 400,7:480 };
    this.playerColumns = { 1: 0, 2: 100, 3: 200, 4: 300, 5: 400 };
    this.colisionLines = [2, 3, 4];
    this.resetting = false;
    this.maxColumn = 5;
    this.maxLine = 6;
    this.level = 1;
    this.levelingUp = false;
    this.addEnemy();
    this.addEnemy(2);
    this.addEnemy(3);
    this.paintLevel();
    this.paintScore();
    this.addAllAvatars();
    //Listen for click on avatar selector
    this.avatarElement.addEventListener("click", (e)=>
    {
        e.preventDefault();
        if (e.target.tagName === "IMG") {
            this.player.changeAvatar(e.target.getAttribute("src"));
        }
    });
}
//Add enemy to board
Game.prototype.addEnemy = function(line = 1,sprite = 'images/enemy-bug.png')
{
    this.allEnemies.push(new Enemy(this,line,sprite));
};
//increase level of the game
Game.prototype.increaseLevel = function()
{
    this.levelingUp = true;
    this.level++;
    this.paintLevel();
    this.score+=5;
    this.paintScore();
    setTimeout(() =>
    {
        this.levelingUp = false;
        if (this.level % 2 === 0 && this.allEnemies.length <7) {
            this.addEnemy(Math.floor(Math.random() * 3 + 1));
        }
        this.player.reset();
    },1000);
};
//paint the current level
Game.prototype.paintLevel = function()
{
    this.levelElement.innerHTML = `Level: ${this.level}`;
};
//paint the current score
Game.prototype.paintScore = function()
{
    this.scoreElement.innerHTML = `Score: ${this.score}`;
};
//Check for collision
Game.prototype.checkCollision = function()
{
    if (!this.colisionLines.includes(this.player.y) || this.resetting) return;
    let colided = false;
    for (let enemy of this.allEnemies) {
        colided = enemy.y === this.player.y - 1 && enemy.x +30 > this.playerLines[this.player.x] && enemy.x -30 < this.playerLines[this.player.x + 1];
        if(colided) break;
    }
    if (colided) {
        this.score -= this.score === 0 ? 0 : 1;
        this.paintScore();
        this.resetting = true;
        setTimeout(() =>
            {
                this.player.reset();
                this.resetting = false;
            }
            ,300);
    }
};
//add avatar selectors
Game.prototype.addAllAvatars = function(avatar)
{
    let html = "";
    for (let avatar of this.avatars) {
        html += this.createAvatar(avatar);
    }
    this.avatarElement.innerHTML = html;
};
//create single avatar selector
Game.prototype.createAvatar = function(avatar)
{
    return `<a href="#"><img src="${avatar}" alt="${avatar.replace(/-/g," ").replace(".png","")}"/></a>`;
};