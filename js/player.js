class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 120;     // initial width of the player
        this.spriteHeight = 190;    // initial height of the player
        this.width;
        this.height;
        this.x = 20;                // initial X position of the player
        this.y = (this.game.height - this.spriteHeight) / 2;    // initial Y position of the player
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 3;          // movement pixel per frame
        this.projectiles = [];
    }

    // changes player property over time
    update() {
        // don't let the player object to leave canvas borders
        if (this.game.keys.has('ArrowUp') && this.y >= 0) this.speedY = -this.maxSpeed;
        else if (this.game.keys.has('ArrowDown') && this.y + this.height <= this.game.height) this.speedY = this.maxSpeed;
        else this.speedY = 0;

        if (this.game.keys.has('ArrowLeft') && this.x >= 0) this.speedX = -this.maxSpeed;
        else if (this.game.keys.has('ArrowRight') && this.x + this.width <= this.game.width) this.speedX = this.maxSpeed;
        else this.speedX = 0;

        this.x += this.speedX;
        this.y += this.speedY;

        // handle projectiles
        this.projectiles.forEach(projectile => {
            projectile.update();
        });
        this.projectiles = this.projectiles.filter(projectile => !projectile.markForDeletion);
    }

    // how the player looks like
    draw(context) {
        console.log(this.game.height, this.spriteHeight, this.game.ratio, this.y);

        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, this.width, this.height);
        
        this.projectiles.forEach(projectile => {
            projectile.draw(context);
        });
    }

    // show projectiles on screen
    shoot() {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + 100, this.y + 30));
            this.game.ammo--;
        }
    }

    // player resizing (resolution dependency)
    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
    }
}