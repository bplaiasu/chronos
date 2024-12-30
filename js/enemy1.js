class Enemy1 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 228 * 0.2;
        this.height = 169 * 0.2;
        this.speedX = -2;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);

        this.lives = 1;
        this.score = 10;
    }

    // draw(context) {
    //     // Enemy.draw(context);
    //     context.fillText(this.lives, this.x, this.y);
    // }
}