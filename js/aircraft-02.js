class Aircraft_02 extends Enemy {
    constructor(game) {
        super(game);
        this.image = document.getElementById("enemy_02");
        this.scale = 0.2;
        this.spriteWidth = this.image.width * this.scale * this.game.ratio;
        this.spriteHeight = this.image.height * this.scale * this.game.ratio;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.speedX = -20;
        this.y = Math.random() * (this.game.height * 0.9);

        this.lives = 2;
        this.score = 100;

    }

    draw(context) {
        // show enemy
        context.drawImage(this.image, this.x, this.y, this.width, this.height);

        // only for debug mode
        context.storekeStyle = this.game.debugColor;
        context.fillStyle = 'yellow';
        context.font = 20 * this.game.ratio + 'px Helvetica';
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
            
            // show enemy lives
            context.fillText(this.lives, this.x + this.width * .4, this.y + this.height * .2);
        }
    }

    // resizing enemy
    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
    }
}