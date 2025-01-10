class Explosion {
    constructor(game, x, y) {
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteHeight = 200;
        this.timer = 0;
        this.markForDeletion = false;
        this.maxFrame = 8;
        this.gameFrame = 0;
    }
    
    // set fps of the game
    setFps(fps) {
        this.fps = fps;
    }

    // get the fps
    getFps() {
        // initialize fps to 0
        if (typeof this.fps === 'undefined' || this.fps === null) this.setFps(0);
        return this.fps;
    }

    // set interval in milisecons between frames
    setInterval() {
        this.interval = 1000/this.getFps();
    }

    // get the interval
    getInterval() {
        if (typeof this.interval === 'undefined' || this.interval === null) this.setInterval();
        return this.interval;
    }

    update(deltaTime) {
        if (this.timer > this.getInterval()) {
            this.frameX++;
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }

        if (this.frameX > this.maxFrame) this.markForDeletion = true;
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

class EnemyExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);

        this.image = document.getElementById("enemy-explosion");
        this.spriteWidth = 200;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;

        // set the fps of the explosion to 30
        this.setFps(30);
    }
}

class PlayerExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        // this.frameY = 1;
        this.image = document.getElementById("player-explosion");
        this.spriteWidth = 273;
        this.spriteHeight = 400;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;

        // set the fps of the explosion to 30
        this.setFps(5);
    }
}