class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 25;
        this.fontFamily = 'Helvetica';
        this.color = 'white';
    }

    draw(context) {
        context.save();
        context.fillStyle = this.color;

        // apply shadows
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';

        context.font = this.fontSize + 'px ' + this.fontFamily;
        // score
        context.fillText('Lives: ' + this.game.lives, 20, 40)
        
        // lives
        context.fillText('Score: ' + this.game.score, 150, 40)

        // show charging ammo
        for (let i = 0; i < this.game.ammo; i++) {
            context.fillRect(20 + 5 * i, 50, 3, 20);
        }

        // game over messages
        if (this.game.gameOver) {
            context.textAlign = 'center';
            let message1;
            let message2;

            if (this.game.score >= this.game.winningScore) {
                message1 = 'You win!'
                message2 = 'Well done!'
            } else {
                message1 = 'You lose!'
                message2 = 'Try again next time!'
            }

            context.font = '50px ' + this.fontFamily;
            context.fillText(message1, this.game.width * .5, this.game.height * .5 - 40);
            context.font = '25px ' + this.fontFamily;
            context.fillText(message2, this.game.width * .5, this.game.height * .5 + 40);
        }

        context.restore();
    }
}