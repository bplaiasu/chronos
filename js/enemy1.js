class Enemy1 extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 228 * .2;
        this.spriteHeight = 169 * .2;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.speedX = -2;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);

        this.lives = 1;
        this.score = 10;
    }

    draw(context) {
        // show enemy
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);

        // show enemy lives - just for debuging
        context.fillStyle = 'yellow';
        context.font = 20 * this.game.ratio + 'px Helvetica';
        context.fillText(this.lives, this.x + this.width * .4, this.y + this.height * .6);
    }

    // resizing enemy
    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
    }
}