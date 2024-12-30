class Projectile {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.projectileWidth = 13;
        this.projectileHeight = 3;
        this.width = this.projectileWidth * this.game.ratio;
        this.height = this.projectileHeight * this.game.ratio;
        this.speed = 6;     // represent twice the Player speed
        this.markForDeletion = false;
    }

    // chages properties over time
    update() {
        this.x += this.speed;
        if (this.x > this.game.width * 0.8) this.markForDeletion = true;
    }

    // how the projectile looks like
    draw(context) {
        context.fillStyle = 'yellow';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}