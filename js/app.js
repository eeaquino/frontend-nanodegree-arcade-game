const resetButton = document.getElementById("restart");
// Instance of game
let game = new Game();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    game.player.handleInput(allowedKeys[e.keyCode]);
});
//Reset Game
resetButton.addEventListener("click", () =>
{
    game = null;
    game = new Game();
});

